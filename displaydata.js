import { getSemesterCost } from './Scheduler.js';
import { getCredits } from './courseInfo.js';
import { graduationDate } from './Scheduler.js';
import { getInput } from './InputController.js';

window.onload = function() {
  var generateButton = document.getElementById("generate");
  generateButton.addEventListener("click", displayData);
}

function displayData() {
  var creditsPreferred = document.getElementById("credits_preferred").value; //this is the user input for credits
  var coursesTaken = getInput(); //gets the user input/classes already taken
  var courses = generateSchedule(coursesTaken, creditsPreferred); //gets the next semester classes to display
  var creditsPreferredBox = document.getElementById("inputGroup-sizing-default"); //get HTML element to hid once generate is clicked
  var creditsPreferredBox2 = document.getElementById("credits_preferred"); //get HTML element to hid once generate is clicked
  var generateButtonBox = document.getElementById("generate"); //get HTML element to hid once generate is clicked
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

