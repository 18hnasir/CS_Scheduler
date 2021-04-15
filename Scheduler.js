import { getPreReq } from './courseInfo.js';
import { getCredits } from './courseInfo.js';


//generateSchedule([], 15);
// you can use this array to test the schedule generation with different classes taken
export function generateSchedule(coursesTaken, creditsPreferred) {

    var semestersUntilGraduation = [];
    var nextSemesterClasses = [];
    
    // list of courses organized by category
    var csCoreList = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
    var csCoreList2 = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
    var mason_core = shuffle(["WrittenCommunication", "Literature", "Arts", "WesternCivilizationWorldHistory", "SocialandBehavioralSciences", "GlobalUnderstanding"]);
    var communication = ["ENGH101", "COMM100", "ENGH302"];
    var math = ["MATH113", "MATH114", "MATH125", "MATH203", "MATH203", "MATH213", "STAT344"];
    var scienceList = shuffle(["BIOL103", "CHEM211","GEOL101", "PHYS160"]);
    var scienceList2 = ["BIOL103", "CHEM211","GEOL101", "PHYS160"];
    var csRelatedList = shuffle(["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
    "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"]);
    var csRelatedList2 = ["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
    "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"];
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
            for (var i = 0; i < scienceList2.length; i++) {
                if (coursesTaken.includes(scienceList2[i])) {
                    scienceClassesTaken++;
                }
            }
            // Considering that the student has taken three science classes, they do not need to take anymore classes.
            scienceList.forEach(scienceClass => {
                if(scienceLoopStop){
                    return;
                }
                else if (scienceClassesTaken >= 2) {
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
            for (var i = 0; i < csCoreList2.length; i++) {
                if (coursesTaken.includes(csCoreList2[i])) {
                    csCoreCredits += getCredits(csCoreList2[i]);
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
            for (var i = 0; i < csRelatedList2.length; i++) {
                if (coursesTaken.includes(csRelatedList2[i])) {
                    csRelatedCredits += getCredits(csRelatedList2[i]);
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

// function checks if the prerequisites of a class are contained in the list of courses taken.
export function hasPreReqs(coursesTaken, class1) {
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
// returns true or false depending on whether the user has met all graduation requirements
export function meetsRequirements(coursesTaken){
    var core = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
    if(getSemesterCredits(coursesTaken) < 120){
        return false;
    }
    /*console.log(getSemesterCredits(coursesTaken));
    for(var i=0;i<core.length;i++){
        console.log(coursesTaken);
        console.log(core[i].valueOf());
        if(!coursesTaken.includes(core[i].valueOf())){
            return false;
        }    
    }
    /*var maths = ["MATH113", "MATH114", "MATH125", "MATH203", "MATH203", "MATH213", "STAT344"];
    for(var i=0;i<maths.length;i++){
        if(!coursesTaken.includes(maths[i])){
            return false;
        }    
    }
    var sciencesList = ["BIOL103", "CHEM211","GEOL101", "PHYS160"];
    var scienceClasses = 0;
    for (var i = 0; i < sciencesList.length; i++) {
        if (coursesTaken.includes(sciencesList[i])) {
            scienceClasses++;
        }
    }
    if(scienceClasses < 2){
        return false;
    }
    var mCore = ["Written Communication", "Literature", "Arts", "Western Civilization/World History", "Social and Behavioral Science", "Global Understanding"];
    for(var i=0;i<mCore.length;i++){
        if(!coursesTaken.includes(mCore[i])){
            return false;
        }    
    }*/
    return true;
    
}

// function that returns the number of credits in a semester
export function getSemesterCredits(semester){
    var numCredits = 0;
    for(var i=0;i<semester.length;i++){
        numCredits += getCredits(semester[i]);
    }
    return numCredits;
}

// returns cost of semester based on number of credits, note: this is for in-state tuition and does not include out of state
// this also does not include lab fees and other course related fees
export function getSemesterCost(semester){
    var numCredits = getSemesterCredits(semester);
    if(numCredits < 12){
        return numCredits * 396.25 + numCredits * 146;
    }
    else if(numCredits < 16 && numCredits > 11){
        return 4755 + 1752;
    }
    else{
        return 4755 + ((numCredits - 15) * 396.25) + 1752 + ((numCredits - 15) * 146);
    }
}

// function that returns the number of semesters until graduation
export function graduationDate(listOfSemesters){
    return "Expected Graduation in " + listOfSemesters.length + " semesters";
}

// function that will shuffle class arrays to randomize schedule generation
export function shuffle(courseList) {
    courseList.sort(() => Math.random() - 0.5);
    return courseList
}
