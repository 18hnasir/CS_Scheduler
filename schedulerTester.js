import { generateSchedule } from './Scheduler.js';
import { hasPreReqs } from './Scheduler.js';
import { getSemesterCredits } from './Scheduler.js';
import { getSemesterCost } from './Scheduler.js';
import { meetsRequirements } from './Scheduler.js';
import { graduationDate } from './Scheduler.js';
import { shuffle } from './Scheduler.js';

var numPassed = 0;

console.log("Running tests");
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 1");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 1
// will test to ensure that a standard 15 credit schedule with no use inputted classes has 8 semesters and meets degree requirements
var check1 = false;
var check2 = false;
var classUntilGrad = generateSchedule([], 15, []);
var expectedGrad = graduationDate(classUntilGrad);
var Allclasses = [];
if(expectedGrad.charAt(23) == 8){
    check1 = true;
}
for(var i=0;i<classUntilGrad.length;i++){
    for(var j=0;j<classUntilGrad[i].length;j++){
        Allclasses.push(classUntilGrad[i][j]);
    }
}
check2 = meetsRequirements(Allclasses);
if(check1 && check2){
    numPassed++;
}

console.log("Expected: true Actual: "  + (check1 && check2));
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 2");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 2
// will test to ensure that a schedule generated with a few user inputted classes meets degree requirements
var check1 = false;
var classUntilGrad2 = generateSchedule(["BIOL103", "CS110", "MATH113", "Arts", "STAT354"], 15, []);
var expectedGrad = graduationDate(classUntilGrad2);
var Allclasses = [];
for(var i=0;i<classUntilGrad2.length;i++){
    for(var j=0;j<classUntilGrad2[i].length;j++){
        Allclasses.push(classUntilGrad[i][j]);
    }
}
check1 = meetsRequirements(Allclasses);
if(check1){
    numPassed++;
}

console.log("Expected: true Actual: "  + (check1));



console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 3");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 3
// will test to ensure that a schedule generated with many user inputted classes meets degree requirements
var check1 = false;
var classUntilGrad2 = generateSchedule(["BIOL103", "CS110", "MATH114", "MATH113", "Arts", "CS112", "CS211", "CHEM211", "CS321", "CS310", "ENGH101", "ENGH302", "COMM100", "CS310", "CS367", "CS330", "SWE432"], 15, []);
var expectedGrad = graduationDate(classUntilGrad2);
var Allclasses = [];
for(var i=0;i<classUntilGrad2.length;i++){
    for(var j=0;j<classUntilGrad2[i].length;j++){
        Allclasses.push(classUntilGrad[i][j]);
    }
}
check1 = Allclasses.length;
if(check1 < 30 && check1 > 20){
    numPassed++;
}

console.log("Expected: true Actual: "  + (check1 < 30 && check1 > 20));

console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 4");
console.log("---------------------------------------------------------------------------------------------------------------");

// test 4
// will test the has preReqs function to ensure that a class
console.log("hasPreReqs");
var courseTaken = ["MATH203", "CS112"];
var haspre = hasPreReqs(courseTaken, "MATH446");
if(haspre){
    numPassed++;
}

console.log("Expected: true Actual: " + haspre);
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 5");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 5
// will test get semester credits
console.log("getSemesterCredits");
var sem = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];
var numCreds = getSemesterCredits(sem);
if(numCreds == 17){
    numPassed++;
}
console.log("Expected: 17 Actual: " + numCreds);
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 6");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 6
// will test get semester cost
console.log("getSemesterCost");
var sem = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];
var cost = getSemesterCost(sem);
if(cost == 7591.5){
    numPassed++;
}
console.log("Expected: 7591.5 Actual: " + cost);
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 7");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 7
// will test expected graduation date
console.log("graduationDate");
var sems = classUntilGrad;
var expectedGrad = graduationDate(sems);
if(expectedGrad.charAt(23) == 8){
    numPassed++;
}
console.log("Expected Expected Graduation in 8 semesters Actual: " + expectedGrad);
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 8");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 8
// will test shuffle
console.log("shuffle");
var passed = true;
var classList = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];
var newList = shuffle(classList);
for(var i=0;i<classList.length;i++){
    if(!classList.includes(newList[i])){
        passed = false;
    }
}
if(passed){
    numPassed++;
}
console.log("Expected: true Actual: " + passed);

console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 9");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 9
// will test meets requirements
var classList1 = ["BIOL107", "CS455", "CS468"];
var m = meetsRequirements(classList1);
if(!m){
    numPassed++;
}
console.log("Expected: false Actual: " + m);
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 10");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 10
// this will test to make sure a schedule will contain the must include classes
var check2 = true;
var mustHave = ["STAT354", "SWE432", "CS480", "CS490", "CS455", "CS477", "ECE301"];
mustHave = [];
var classUntilGrad3 = generateSchedule(["BIOL103", "CS110", "MATH113", "Arts", "STAT354"], 15, mustHave);
var expectedGrad = graduationDate(classUntilGrad3);
var Allclasses = [];
for(var i=0;i<classUntilGrad3.length;i++){
    for(var j=0;j<classUntilGrad3[i].length;j++){
        Allclasses.push(classUntilGrad3[i][j]);
    }
}
for(var i=0;i<mustHave.length;i++){
    if(!Allclasses.includes(mustHave[i])){
        check2 = false;
    }
}

if(check2){
    numPassed++;
}
console.log("Expected: true Actual: "  + (check2));
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Tests Complete");
console.log("Number of tests passed: " + numPassed + "/10");
console.log("---------------------------------------------------------------------------------------------------------------");