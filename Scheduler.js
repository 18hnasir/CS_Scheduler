import { getPreReq } from './courseInfo.js';
import { getCredits } from './courseInfo.js';

// you can use this array to test the schedule generation with different classes taken
var courses = ["CS112", "BIOL103", "BIOL106", "BIOL107", "CS321", "SWE443", "CS332", "CHEM211", "CHEM213", "CS310", "CS367"];
generateSchedule(courses);


function generateSchedule(coursesTaken) {

    // array containing next semester's classes
    var nextSemesterClasses = [];

    /* add mason core comm and math loops here*/
    var mason_core = ["Written Communication", "Literature", "Arts", "Western Civilization/World History", "Social and Behavioral Science", "Global Understanding"];
    var communication = ["COMM100", "ENGH302"];
    var math = ["MATH113", "MATH114", "MATH125", "MATH203", "MATH203", "MATH213", "STAT344"];
    var c; //count

    for (c in mason_core) {
        if (coursesTaken.includes(mason_core[c])) {

        }
        else {
            nextSemesterClasses.push(mason_core[c]);
            break;
        }
    }
    for (c in communication) {
        if (coursesTaken.includes(communication[c])) {

        }
        else {
            nextSemesterClasses.push(communication[c]);
            break;
        }
    }
    for (c in math) {
        if (coursesTaken.includes(math[c])) {

        }
        else {
            nextSemesterClasses.push(math[c]);
            break;
        }
    }

    // adds a science course to the user's schedule, only thing that will need to be fixed is in the case of the student failing a class but passing a lab but otherwise seems to work
    var scienceList = ["BIOL103", "BIOL106", "CHEM211", "CHEM212", "GEOL101", "PHYS160", "PHYS260"];
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
        if (scienceClassesTaken == 3) {
            scienceLoopStop = true;
            return;
        }
        if (coursesTaken.includes("BIOL103") && !coursesTaken.includes("BIOL106") && !scienceLoopStop) {
            nextSemesterClasses.push("BIOL106");
            nextSemesterClasses.push("BIOL107");
            scienceLoopStop = true;
            return;
        }
        if (coursesTaken.includes("GEOL101") && !coursesTaken.includes("GEOL102") && !scienceLoopStop) {
            nextSemesterClasses.push("GEOL102");
            scienceLoopStop = true;
            return;
        }
        if (coursesTaken.includes("CHEM211") && !coursesTaken.includes("CHEM212") && !scienceLoopStop) {
            nextSemesterClasses.push("CHEM212");
            nextSemesterClasses.push("CHEM214")
            scienceLoopStop = true;
            return;
        }
        if (coursesTaken.includes("PHYS160") && !coursesTaken.includes("PHYS260") && !scienceLoopStop) {
            nextSemesterClasses.push("PHYS260");
            nextSemesterClasses.push("PHYS261")
            scienceLoopStop = true;
            return;
        }
        if (hasPreReqs(coursesTaken, scienceClass) && !coursesTaken.includes(scienceClass) && !scienceLoopStop) {
            nextSemesterClasses.push(scienceClass);
            if (scienceClass == "CHEM211") {
                nextSemesterClasses.push("CHEM213");
            }
            if (scienceClass == "PHYS160") {
                nextSemesterClasses.push("PHYS161");
            }
            scienceLoopStop = true;
            return;
        }
        else {
            return;
        }
    });

    /*add cs Core loop here */
    var csCoreList = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
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

        if (hasPreReqs(coursesTaken, csClass) && !coursesTaken.includes(csClass) && !csCoreLoop) {
            nextSemesterClasses.push(csClass);
            csCoreLoop = true;
            return;
        }
    });

    // adds a cs related course to next semester's schedule
    var csRelatedList = ["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
        "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"];
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
            csLoopStop = true;
            return;
        }
    }
    )


    /* add senior cs loop here*/
    var csSeniorList = ["CS455", "CS468", "CS475", "CS425", "CS440", "CS450", "CS451", "CS455",
        "CS463", "CS465", "CS468", "CS469", "CS475", "CS477", "CS480", "CS482", "CS484", "CS485",
        "CS490", "CS491", "CS499", "MATH446", "OR481"];
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
        if ((!coursesTaken.includes("CS455") && hasPreReqs(coursesTaken,"CS455") || !coursesTaken.includes("CS468") && hasPreReqs(coursesTaken, "CS468") || !coursesTaken.includes("CS475") && hasPreReqs(coursesTaken, "CS475")) && !csSeniorLoopStop) {
            nextSemesterClasses.push("CS455");
            csSeniorLoopStop = true;
            return;
        }

        if (!csSeniorLoopStop && (csClass != "CS455" || csClass != "CS455" || csClass != "CS468") && hasPreReqs(coursesTaken, csClass)){
            nextSemesterClasses.push(csClass);
            return;
        }
    });

    // will print out next semester's classes (for testing purposes)
    console.log(nextSemesterClasses);
}

// function checks if the prerequisites of a class are contained in the list of courses taken.
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
