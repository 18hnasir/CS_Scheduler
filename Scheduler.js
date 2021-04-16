import { getPreReq } from './courseInfo.js';
import { getCredits } from './courseInfo.js';

// this is the main function to generate a double array containing semesters until graduation
export function generateSchedule(coursesTaken, creditsPreferred, mustInclude) {

    // keeps track of next semester and when that is filled up, it will add that semester to our semester's until graduation list
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
    var csSeniorList = shuffle(["CS455", "CS468", "CS475", "CS425", "CS440", "CS450", "CS451", "CS455",
    "CS463", "CS465", "CS468", "CS469", "CS475", "CS477", "CS480", "CS482", "CS484", "CS485",
    "CS490", "CS491", "CS499", "MATH446", "OR481"]);

    // adds all of the preReqs for a must include class to the must include list
    for(var i=0;i<mustInclude.length;i++){
        var reqs = getPreReq(mustInclude[i]);
        for(var j=0;j<reqs.length;j++){
            if(!mustInclude.includes(reqs[j])){
                mustInclude.push(reqs[j]);
            }
        }
    }



    // adds counter as a failsafe to ensure generation stops
    var ct = 0;
    var hasMustInclude = true;
    while(!meetsRequirements(coursesTaken) && ct < 25 && hasMustInclude){
        var creditsInSemester = 0;
        // array containing next semester's classes
        while(creditsPreferred > creditsInSemester){

            // adds a must include class to the schedule
            for(var i=0;i<mustInclude.length;i++){
                if(hasPreReqs(coursesTaken, mustInclude[i]) && !coursesTaken.includes(mustInclude[i]) && !nextSemesterClasses.includes(mustInclude[i])){
                    nextSemesterClasses.push(mustInclude[i]);
                    break;
                }
            }

            /* adds a mason core to the schedule*/
            var c; //count
            //loops through mason core list
            for (c in mason_core) {
                // if the class is in the schedule then ignore it
                if (coursesTaken.includes(mason_core[c]) || nextSemesterClasses.includes(mason_core[c])) {

                }
                // otherwise add it to next semester's classes
                else {
                    nextSemesterClasses.push(mason_core[c]);
                    mason_core.shift();
                    break;
                }
            }
            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            // loops through communications list
            for (c in communication) {
                // if class is in the schedule then ignore it
                if (coursesTaken.includes(communication[c]) || nextSemesterClasses.includes(communication[c])) {

                }
                // otherwise add it to next semester's classes
                else {
                    nextSemesterClasses.push(communication[c]);
                    communication.shift();
                    break;
                }
            }
            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            for (c in math) {
                if (coursesTaken.includes(math[c]) || nextSemesterClasses.includes(math[c])) {

                }
                else {
                    nextSemesterClasses.push(math[c]);
                    math.shift();
                    break;
                }
            }
            // if next semester's credits is more than the preferred, then break out of the loop
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
            // loops through the science classes
            scienceList.forEach(scienceClass => {
                if(scienceLoopStop){
                    return;
                }
                // if the student has taken two or more science courses fromt the list then they will fulfill degree requirements
                else if (scienceClassesTaken >= 2) {
                    scienceLoopStop = true;
                    return;
                }
                // this section will add the sequential science courses with labs
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
                // if the student hasn't taken any science courses, then add one to the schedule with associated lab
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
            // if next semester's credits is more than the preferred, then break out of the loop
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
                // if the student has the prerequisites and hasnt taken the class, add a cs core class to next semester
                if (hasPreReqs(coursesTaken, csClass) && !coursesTaken.includes(csClass) && !csCoreLoop && !nextSemesterClasses.includes(csClass)) {
                    nextSemesterClasses.push(csClass);
                    csCoreList.shift();
                    csCoreLoop = true;
                    return;
                }
            });
            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            // adds a cs related course to next semester's schedule
            var csLoopStop = false;
            csRelatedList.forEach(csClass => {
                if (hasPreReqs(coursesTaken, csClass) && !coursesTaken.includes(csClass) && !csLoopStop && !nextSemesterClasses.includes(csClass)) {
                    nextSemesterClasses.push(csClass);
                    csRelatedList.shift();
                    csLoopStop = true;
                    return;
                }
            }
            )
            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }

            /* adds a senior level cs class to the schedule*/
            var csSeniorLoopStop = false;
            var csSeniorCredits = 0;
            // this will count up the seniorcs credits, if you have enough then there is no need to add another senior cs class
            for (var i = 0; i < csSeniorList.length; i++) {
                // Keep track of credits taken
                if (coursesTaken.includes(csSeniorList[i])) {
                    csSeniorCredits += getCredits(csSeniorList[i]);
                }
            }
            // iterates through the senior cs class list
            csSeniorList.forEach(csClass => {
                // if you have enough credits then stop the loop
                if (csSeniorCredits >= 15) {
                    csSeniorLoopStop = true;
                }
                // this ensures that CS455, CS468, or CS475 gets added to your schedule as it is a degree requirement
                if ((!coursesTaken.includes("CS455") && hasPreReqs(coursesTaken,"CS455") && !coursesTaken.includes("CS468") && hasPreReqs(coursesTaken, "CS468") && !coursesTaken.includes("CS475") && hasPreReqs(coursesTaken, "CS475")) && !csSeniorLoopStop
                && !nextSemesterClasses.includes("CS455") && !nextSemesterClasses.includes("CS468") && !nextSemesterClasses.includes("CS475")) {
                    var csSeniorMustIncludes = ["CS455", "CS468", "CS475"];
                    csSeniorMustIncludes = shuffle(csSeniorMustIncludes);
                    nextSemesterClasses.push(csSeniorMustIncludes[0]);
                    csSeniorList.shift()
                    csSeniorLoopStop = true;
                    return;
                }
                // this will add a senior cs class to next semester if you haven't taken it yet and you have the requirements to take it
                if (!coursesTaken.includes(csClass) && !csSeniorLoopStop && (csClass != "CS455" || csClass != "CS475" || csClass != "CS468") && hasPreReqs(coursesTaken, csClass)
                && !nextSemesterClasses.includes(csClass)){
                    nextSemesterClasses.push(csClass);
                    csSeniorList.shift();
                    csSeniorLoopStop = true;
                    return;
                }
            });
            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }

            // this will ensure that there are not any duplicates in the next semester by turning the array into a set and back into an array
            nextSemesterClasses = [...new Set(nextSemesterClasses)];

            // if next semester's credits is more than the preferred, then break out of the loop
            if(creditsPreferred < getSemesterCredits(nextSemesterClasses)){
                creditsInSemester = getSemesterCredits(nextSemesterClasses);
                break;
            }
            // updates credits variable to break out of loop
            creditsInSemester = getSemesterCredits(nextSemesterClasses);
            // updates counter to ensure generation stops
        }

        nextSemesterClasses = [...new Set(nextSemesterClasses)];

        // adds next semester to courses taken and then resets nextsemester list so we can generate the next semester
        semestersUntilGraduation.push(nextSemesterClasses);
        coursesTaken = coursesTaken.concat(nextSemesterClasses);
        nextSemesterClasses = [];
        // updates counter to ensure we break out of the loop, this is only as a failsafe
        ct++;

        // boolean to ensure the schedule contains all the must include classes
        hasMustInclude = true;
        // this will loop to check if any classes are missing from our must include list
        for(var i=0;i<mustInclude.length;i++){
            if(!coursesTaken.includes(mustInclude[i])){
                hasMustInclude = false;
            }
        }
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
// returns true or false depending on whether the user has met credit requirements
export function meetsRequirements(coursesTaken){
    if(getSemesterCredits(coursesTaken) < 120){
        return false;
    }
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
    else {
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