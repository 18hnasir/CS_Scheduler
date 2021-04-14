import { generateSchedule } from './Scheduler.js';
import { hasPreReqs } from './Scheduler.js';
import { getSemesterCredits } from './Scheduler.js';
import { getSemesterCost } from './Scheduler.js';
import { meetsRequirements } from './Scheduler.js';
import { graduationDate } from './Scheduler.js';

var numPassed = 0;

console.log("Running tests");
console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Test 1");
// test 1
// will test to ensure that a standard 15 credit schedule with no use inputted classes has 8 semesters and meets degree requirements



console.log("Test 2");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 2
// will test to ensure that a schedule generated with a few user inputted classes meets degree requirements





console.log("Test 3");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 3
// will test to ensure that a schedule generated with many user inputted classes meets degree requirements



console.log("Test 4");
console.log("---------------------------------------------------------------------------------------------------------------");

// test 4
// will test the has preReqs function to ensure that a class
var courseTaken = ["MATH203", "CS112"];
var haspre = hasPreReqs(courseTaken, "MATH446");
if(haspre){
    numPassed++;
}

console.log("Expected: true Actual: " + haspre);

console.log("Test 5");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 5
// will test get semester credits
var sem = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];
var numCreds = getSemesterCredits(sem);
if(numCreds == 17){
    numPassed++;
}
console.log("Expected: 17 Actual: " + numCreds);

console.log("Test 6");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 6
// will test get semester cost
var sem = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];
var cost = getSemesterCost(sem);
if(cost == 7591.5){
    numPassed++;
}
console.log("Expected: 7591.5 Actual: " + cost);

console.log("Test 7");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 7
// will test expected graduation date
var sems = generateSchedule([], 15);
var expectedGrad = graduationDate(sems);
if(expectedGrad.charAt(23) == 8){
    numPassed++;
}
console.log("Expected Expected Graduation in 8 semesters Actual: " + expectedGrad);

console.log("Test 8");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 8
// will test shuffle
var classList = ["BIOL103", "CS112", "MATH113", "Arts", "ENGH101"];



console.log("Test 9");
console.log("---------------------------------------------------------------------------------------------------------------");
// test 9
// will test meets requirements





console.log("---------------------------------------------------------------------------------------------------------------");
console.log("Tests Complete");
console.log("Number of tests passed: " + numPassed + "/9");
console.log("---------------------------------------------------------------------------------------------------------------");