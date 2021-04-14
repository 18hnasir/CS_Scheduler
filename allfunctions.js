

function displayData() {
  var courses = [["CS112", "BIOL103", "BIOL106", "BIOL107"], ["CS321", "SWE443", "CS332", "CHEM211", "CHEM213"]]; //tester array
  var creditsPreferredBox = document.getElementById("inputGroup-sizing-default");
  var creditsPreferredBox2 = document.getElementById("credits_preferred");
  var generateButtonBox = document.getElementById("generate");
  var index = 1; //will act as the index of what table body we are trying to target
  var arrayLength; //will let me know when I need to add a row for semester cost
  var tracker = 0; //will act as a tracker for the arrayLength

  courses.forEach(semester => { //semester represents array
    arrayLength = semester.length;
    semester.forEach(c => { //c represents element/class in array
      let table = document.getElementById("tbody" + index); //gets the body's of the tables
      let row = table.insertRow(); //Makes a row in a table <tr>
      let course = row.insertCell(0); //Makes cell in that row <td>
      let credits = row.insertCell(1);
      course.innerHTML = c; //c is the course such as "CS 110"
      credits.innerHTML = getCredits(c); //gets credits for class c
      tracker += 1;
      if (tracker == arrayLength) {
        row = table.insertRow(); //insert row for cost
        row.insertCell(0);
        row.insertCell(1);
        let cost = row.insertCell(2); //insert cell 3 for cost
        cost.innerHTML = getSemesterCost(semester); //set cell to cost of semester
      }
    });
    tracker = 0;
    index += 1;
  });

  creditsPreferredBox.style.display = "none";
  creditsPreferredBox2.style.display = "none";
  generateButtonBox.style.display = "none";
  document.getElementById("expected_graduation").innerHTML = graduationDate(courses);
}

function generateSchedule(coursesTaken, creditsPreferred) {

    var semestersUntilGraduation = [];
    var nextSemesterClasses = [];

    // list of courses organized by category
    var csCoreList = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
    var mason_core = shuffle(["Written Communication", "Literature", "Arts", "Western Civilization/World History", "Social and Behavioral Science", "Global Understanding"]);
    var communication = ["ENGH101", "COMM100", "ENGH302"];
    var math = ["MATH113", "MATH114", "MATH125", "MATH203", "MATH203", "MATH213", "STAT344"];
    var scienceList = shuffle(["BIOL103", "CHEM211","GEOL101", "PHYS160"]);
    var csRelatedList = shuffle(["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
    "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"]);
    var csSeniorList = ["CS455", "CS468", "CS475", "CS425", "CS440", "CS450", "CS451", "CS455",
    "CS463", "CS465", "CS468", "CS469", "CS475", "CS477", "CS480", "CS482", "CS484", "CS485",
    "CS490", "CS491", "CS499", "MATH446", "OR481"];

    while(!meetsRequirements(coursesTaken)){
        var creditsInSemester = 0;
        // array containing next semester's classes
        while(creditsPreferred > creditsInSemester){
            /* adds a mason core to the schedule*/
            var c; //count

            for (c in mason_core) {
                if (coursesTaken.includes(mason_core[c])) {

                }
                else {
                    nextSemesterClasses.push(mason_core[c]);
                    mason_core.shift();
                    break;
                }
            }
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            for (c in communication) {
                if (coursesTaken.includes(communication[c])) {

                }
                else {
                    nextSemesterClasses.push(communication[c]);
                    communication.shift();
                    break;
                }
            }
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            for (c in math) {
                if (coursesTaken.includes(math[c])) {

                }
                else {
                    nextSemesterClasses.push(math[c]);
                    math.shift();
                    break;
                }
            }
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }

            // adds a science course to the user's schedule
            var scienceLoopStop = false;
            var scienceClassesTaken = 0;

            // Checks courses already taken and if it is in scienceList increment scienceClassesTaken.
            for (var i = 0; i < scienceList.length; i++) {
                if (coursesTaken.includes(scienceList[i])) {
                    scienceClassesTaken++;
                }
            }
            // Considering that the student has taken three science classes, they do not need to take anymore classes.
            scienceList.forEach(scienceClass => {
                if(scienceLoopStop){
                    return;
                }
                if (scienceClassesTaken == 3) {
                    scienceLoopStop = true;
                    return;
                }
                else if (coursesTaken.includes("BIOL103") && !coursesTaken.includes("BIOL106") && !scienceLoopStop) {
                    nextSemesterClasses.push("BIOL106");
                    nextSemesterClasses.push("BIOL107");
                    scienceLoopStop = true;
                    return;
                }
                else if (coursesTaken.includes("GEOL101") && !coursesTaken.includes("GEOL102") && !scienceLoopStop) {
                    nextSemesterClasses.push("GEOL102");
                    scienceLoopStop = true;
                    return;
                }
                else if (coursesTaken.includes("CHEM211") && !coursesTaken.includes("CHEM212") && !scienceLoopStop) {
                    nextSemesterClasses.push("CHEM212");
                    nextSemesterClasses.push("CHEM214")
                    scienceLoopStop = true;
                    return;
                }
                else if (coursesTaken.includes("PHYS160") && !coursesTaken.includes("PHYS260") && !scienceLoopStop) {
                    nextSemesterClasses.push("PHYS260");
                    nextSemesterClasses.push("PHYS261")

                    scienceLoopStop = true;
                    return;
                }
                else if (hasPreReqs(coursesTaken, scienceClass) && !coursesTaken.includes(scienceClass) && !scienceLoopStop) {
                    nextSemesterClasses.push(scienceClass);
                    if (scienceClass == "CHEM211") {
                        nextSemesterClasses.push("CHEM213");
                    }
                    else if (scienceClass == "PHYS160") {
                        nextSemesterClasses.push("PHYS161");
                    }
                    scienceList.shift();
                    scienceLoopStop = true;
                    return;
                }
                else {
                    scienceLoopStop = true;
                    return;
                }
            });
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            /*adds a cs core class to the schedule */
            var csCoreLoop = false;
            var csCoreCredits = 0;

            // Keep track of the amount of credits the student takes for cs core classes
            for (var i = 0; i < csCoreList.length; i++) {
                if (coursesTaken.includes(csCoreList[i])) {
                    csCoreCredits += getCredits(csCoreList[i]);
                }
            }

            // Stop the loop if the student has taken 35 credits
            csCoreList.forEach(csClass => {
                if (csCoreCredits >= 35) {
                    csCoreLoop = true;
                }

                if (hasPreReqs(coursesTaken, csClass) && !coursesTaken.includes(csClass) && !csCoreLoop && !nextSemesterClasses.includes(csClass)) {
                    nextSemesterClasses.push(csClass);
                    csCoreList.shift();
                    csCoreLoop = true;
                    return;
                }
            });
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            // adds a cs related course to next semester's schedule
            var csLoopStop = false;
            var csRelatedCredits = 0;
            for (var i = 0; i < csRelatedList.length; i++) {
                if (coursesTaken.includes(csRelatedList[i])) {
                    csRelatedCredits += getCredits(csRelatedList[i]);
                }
            }
            csRelatedList.forEach(csClass => {
                if (csRelatedCredits >= 6) {
                    csLoopStop = true;
                }
                if (hasPreReqs(coursesTaken, csClass) && !coursesTaken.includes(csClass) && !csLoopStop) {
                    nextSemesterClasses.push(csClass);
                    csRelatedList.shift();
                    csLoopStop = true;
                    return;
                }
            }
            )
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }

            /* adds a senior level cs class to the schedule*/
            var csSeniorLoopStop = false;
            var csSeniorCredits = 0;

            for (var i = 0; i < csSeniorList.length; i++) {
                // Keep track of credits taken
                if (coursesTaken.includes(csSeniorList[i])) {
                    csSeniorCredits += getCredits(csSeniorList[i]);
                }
            }

            csSeniorList.forEach(csClass => {
                if (csSeniorCredits >= 15) {
                    csSeniorLoopStop = true;
                }
                if ((!coursesTaken.includes("CS455") && hasPreReqs(coursesTaken,"CS455") && !coursesTaken.includes("CS468") && hasPreReqs(coursesTaken, "CS468") && !coursesTaken.includes("CS475") && hasPreReqs(coursesTaken, "CS475")) && !csSeniorLoopStop
                && !nextSemesterClasses.includes("CS455") && !nextSemesterClasses.includes("CS468") && !nextSemesterClasses.includes("CS475")) {
                    var csSeniorMustIncludes = ["CS455", "CS468", "CS475"];
                    csSeniorMustIncludes = shuffle(csSeniorMustIncludes);
                    nextSemesterClasses.push(csSeniorMustIncludes[0]);
                    csSeniorList.shift()
                    csSeniorLoopStop = true;
                    return;
                }

                if (!coursesTaken.includes(csClass) && !csSeniorLoopStop && (csClass != "CS455" || csClass != "CS475" || csClass != "CS468") && hasPreReqs(coursesTaken, csClass)
                && !nextSemesterClasses.includes(csClass)){
                    nextSemesterClasses.push(csClass);
                    csSeniorList.shift();
                    csSeniorLoopStop = true;
                    return;
                }
            });
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            creditsInSemester = getSemesterCredits(nextSemesterClasses);
        }
        // adds next semester to courses taken and then resets nextsemester list so we can generate the next semester
        semestersUntilGraduation.push(nextSemesterClasses);
        coursesTaken = coursesTaken.concat(nextSemesterClasses);
        nextSemesterClasses = [];
    }
    return semestersUntilGraduation;
}

function hasPreReqs(coursesTaken, class1) {
    var listOfPreReqs = getPreReq(class1);
    var canTake = true;
    listOfPreReqs.forEach(req => {
        if (!coursesTaken.includes(req) || req == "*") {
            canTake = false;
            return;
        }
    });
    return canTake;
}

function meetsRequirements(coursesTaken){
    if(getSemesterCredits(coursesTaken) < 120){
        return false;
    }
    else{
        return true;
    }
}

function getPreReq(className){

// not fully implimented

    var courses = {"CS110" : [],"CS112" : ["MATH113"], "CS211" : ["CS112"],"CS222" : ["CS112"],
    "CS262" : ["CS211","CS110"],"CS306" : ["COMM100", "ENGH302", "CS110"], "CS310" : ["CS211", "MATH113"],"CS321" : ["CS310", "ENGH302"], "CS325" : ["CS211"],
    "CS330" : ["CS211", "MATH125"], "CS332" : ["CS321"],"CS351" : ["CS262", "CS310"], "CS367" : ["MATH125", "CS262", "CS110"],
    "CS390" : ["CS321", "CS262", "CS310"], "CS391" : ["CS310"],"CS395" : ["CS211"], "CS399" : ["CS211"],
    "CS425" : ["CS310", "CS351"], "CS426" : ["CS325", "CS425"],"CS440" : ["CS310", "CS330", "CS367"], "CS444" : ["CS310"],
    "CS445" : ["CS310", "STAT344"], "CS450" : ["CS310", "CS330"],"CS451" : ["MATH203", "CS310", "CS367"], "CS455" : ["CS367", "STAT344", "CS310"],
    "CS463" : ["CS310", "CS367", "CS330"], "CS465" : ["CS367"],"CS468" : ["CS310", "CS367"], "CS469" : ["CS330", "CS367", "STAT344"],
    "CS471" : ["CS310", "CS367"], "CS475" : ["CS310", "CS367"],"CS477" : ["CS310", "CS367"], "CS480" : ["CS310", "CS330"],
    "CS482" : ["CS310", "STAT344", "MATH203"], "CS483" : ["CS310", "CS330", "MATH125"],"CS484" : ["CS310", "STAT344"], "CS485" : ["CS262", "MATH203", "CS310"],
    "CS490" : ["CS321", "CS483"], "CS491" : ["CS321", "CS483", "CS367"],"CS498" : ["60"], "CS499" : ["CS310", "CS330"],
    "MATH113" : ["MATH105"], "MATH114" : ["MATH113"],"MATH125" : ["MATH113"], "MATH203" : ["MATH114"],
    "MATH213" : ["MATH114"], "STAT344" : ["MATH114"], "COMM101" : [],"COMM100" : [], "BIOL103" : [],
    "BIOL106" : [], "BIOL107" : ["*"],"CHEM211" : [], "CHEM213" : ["CHEM211"],
    "CHEM212" : ["*"], "CHEM214" : ["*"],"GEOL101" : [], "GEOL102" : [],
    "PHYS160" : ["MATH114"], "PHYS161" : ["*"],"PHYS260" : ["PHYS160"], "PHYS261" : ["*"],"ENGH302" : ["ENGH101", "Literature"],
    "MATH446" : ["MATH203", "CS112"], "OR481" : ["MATH203", "CS112"],"ECE445" : ["CS262", "ECE331"], "STAT354" : ["STAT344"],
    "OR335" : ["STAT344", "CS211", "CS112"], "OR441" : ["MATH203"],"OR442" : ["STAT344"], "ECE301" : ["MATH125"],
    "ECE331" : ["CS112", "PHYS261"], "ECE231" : ["CS112", "PHYS261"],"ECE332" : ["CS112", "PHYS261"], "ECE232" : ["CS112", "PHYS261"],
    "ECE350" : ["CS262", "ECE301", "ECE332", "ECE280"], "ECE446" : ["CS465", "ECE445"],"ECE447" : ["ECE350"], "ECE511" : ["CS465"],
    "SWE432" : ["MATH125", "CS321"], "SWE437" : ["MATH125", "CS310"],"SWE443" : ["CS321"], "SYST371" : ["SYST210"],
    "SYST470" : ["STAT344", "SYST210"], "PHIL371" : ["3Creds"],"PHIL376" : ["PHIL173"], "ENGH388" : ["ENGH302"],
"ENGH101" : []};
    return courses[className];
}

function getCredits(className) {

  // still needed: any math over 351, and electives

  var courses = {
    "CS110": 3,
    "CS100": 3,
    "CS112": 4,
    "CS101": 2,
    "CS105": 1,
    "CS211": 3,
    "CS222": 3,
    "CS262": 3,
    "CS306": 3,
    "CS310": 3,
    "CS321": 3,
    "CS325": 3,
    "CS330": 3,
    "CS332": 3,
    "CS351": 3,
    "CS367": 4,
    "CS390": 3,
    "CS391": 1,
    "CS395": 1,
    "CS399": 3,
    "CS425": 3,
    "CS426": 3,
    "CS440": 3,
    "CS444": 3,
    "CS445": 3,
    "CS450": 3,
    "CS451": 3,
    "CS455": 3,
    "CS463": 3,
    "CS465": 3,
    "CS468": 3,
    "CS469": 3,
    "CS471": 3,
    "CS475": 3,
    "CS477": 3,
    "CS480": 3,
    "CS482": 3,
    "CS483": 3,
    "CS484": 3,
    "CS485": 3,
    "CS490": 3,
    "CS491": 3,
    "CS498": [1, 2, 3],
    "CS499": 3,
    "CS110": 3,
    "CS100": 3,
    "CS110": 3,
    "CS100": 3,
    "MATH113": 4,
    "MATH114": 3,
    "MATH125": 3,
    "MATH203": 3,
    "MATH213": 3,
    "CS100": 3,
    "CS110": 3,
    "CS100": 3,
    "STAT344": 3,
    "COMM101": 3,
    "COMM100": 3,
    "BIOL103": 3,
    "BIOL106": 3,
    "BIOL107": 1,
    "CHEM211": 3,
    "CHEM213": 1,
    "CHEM212": 3,
    "CHEM214": 1,
    "GEOL101": 4,
    "GEOL102": 4,
    "PHYS160": 3,
    "PHYS161": 1,
    "PHYS260": 3,
    "PHYS261": 1,
    "CS110": 3,
    "CS100": 3,
    "CS110": 3,
    "CS100": 3,
    "ENGH302": 3,
    "MATH446": 3,
    "OR481": 3,
    "ECE445": 3,
    "STAT354": 3,
    "OR335": 3,
    "OR441": 3,
    "OR442": 3,
    "ECE301": 3,
    "ECE331": 3,
    "ECE231": 3,
    "ECE332": 3,
    "ECE232": 3,
    "ECE350": 3,
    "ECE446": 3,
    "ECE447": 3,
    "ECE511": 3,
    "SWE432": 3,
    "SWE437": 3,
    "SWE443": 3,
    "SYST371": 3,
    "SYST470": 3,
    "PHIL371": 3,
    "PHIL376": 3,
    "ENGH388": 3,
    "Literature": 3,
    "Written Communication": 3,
    "Arts": 3,
    "Western Civilization/World History": 3,
    "Social and Behavioral Science": 3,
    "Global Understanding": 3
  };

  return courses[className];
}

function getSemesterCredits(semester){
    var numCredits = 0;
    for(var i=0;i<semester.length;i++){
        numCredits += getCredits(semester[i]);
    }
    return numCredits;
}

function getSemesterCost(semester){
    var numCredits = getSemesterCredits(semester);
    if(numCredits < 12){
        return numCredits * 377.5 + numCredits * 146;
    }
    else if(numCredits < 16 && numCredits > 11){
        return 4530 + 1752;
    }
    else{
        return 4530 + ((numCredits - 15) * 377.5) + 1752 + ((numCredits - 15) * 146);
    }
}

function graduationDate(listOfSemesters){
    return "Expected Graduation in " + listOfSemesters.length + " semesters";
}

function shuffle(courseList) {
    courseList.sort(() => Math.random() - 0.5);
    return courseList
}
