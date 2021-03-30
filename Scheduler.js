import { getPreReq } from './courseInfo.js';

var courses = ["CS112"];
generateSchedule(courses);


function generateSchedule(coursesTaken){

    var nextSemesterClasses = [];
    var scienceList = ["BIOL103", "BIOL106", "BIOL107","CHEM211", "CHEM213","CHEM212", "CHEM214","GEOL101", "PHYS160", "PHYS161","PHYS260", "PHYS261"];

    var scienceLoopStop = false;
    scienceList.forEach(scienceClass => {
        if(hasPreReqs(coursesTaken, scienceClass) && !coursesTaken.includes(scienceClass) && !scienceLoopStop){
            nextSemesterClasses.push(scienceClass);
            scienceLoopStop = true;
            return;
        }
        else{
            return;
        }
    });
    console.log(nextSemesterClasses);





}

// function checks if the prerequisites of a class are contained in the list of courses taken.
function hasPreReqs(coursesTaken, class1){

    var listOfPreReqs = getPreReq(class1);
    var canTake = true;
    listOfPreReqs.forEach(req => {
        if(!coursesTaken.includes(req) || req == "*"){
            canTake = false;
            return;
        }
    });
    return canTake;
}