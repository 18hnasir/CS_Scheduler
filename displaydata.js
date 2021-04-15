import { getSemesterCost } from './Scheduler.js';
import { getCredits } from './courseInfo.js';
import { graduationDate } from './Scheduler.js';

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
