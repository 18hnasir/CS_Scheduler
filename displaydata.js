import { getSemesterCost } from './Scheduler.js';
import { generateSchedule } from './Scheduler.js';
import { getCredits } from './courseInfo.js';
import { graduationDate } from './Scheduler.js';
import { shuffle } from './Scheduler.js';
//import { getInput } from './InputController.js';

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

function getInput() {
  var csCoreList = ["CS110", "CS112", "CS211", "CS262", "CS306", "CS310", "CS321", "CS330", "CS367", "CS471", "CS483"];
  var mason_core = shuffle(["WrittenCommunication", "Literature", "Arts", "WesternCivilizationWorldHistory", "SocialandBehavioralSciences", "GlobalUnderstanding"]);
  var communication = ["ENGH101", "COMM100", "COMM101", "ENGH302"];
  var math = ["MATH113", "MATH114", "MATH125", "MATH203", "MATH203", "MATH213", "STAT344"];
  var scienceList = shuffle(["BIOL103", "CHEM211","GEOL101", "PHYS160"]);
  var csRelatedList = shuffle(["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
      "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"]);
  var csSeniorList = ["CS455", "CS468", "CS475", "CS425", "CS440", "CS450", "CS451", "CS455",
      "CS463", "CS465", "CS468", "CS469", "CS475", "CS477", "CS480", "CS482", "CS484", "CS485",
      "CS490", "CS491", "CS499", "MATH446", "OR481"];
  var coursesTaken = []; //going to add checked classes to here

  var i; //count

  for (i in csCoreList) {
    let cbox = document.getElementById(csCoreList[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(csCoreList[i]);
    }
  }

  for (i in mason_core) {
    let cbox = document.getElementById(mason_core[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(mason_core[i]);
    }
  }

  for (i in communication) {
    let cbox = document.getElementById(communication[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(communication[i]);
    }
  }

  for (i in math) {
    let cbox = document.getElementById(math[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(math[i]);
    }
  }

  for (i in scienceList) {
    let cbox = document.getElementById(scienceList[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(scienceList[i]);
    }
  }

  for (i in csRelatedList) {
    let cbox = document.getElementById(csRelatedList[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(csRelatedList[i]);
    }
  }

  for (i in csSeniorList) {
    let cbox = document.getElementById(csSeniorList[i]).checked; //going to get checkbox with class ID
    if (cbox == true) { //if that checkbox is checked
      coursesTaken.push(csSeniorList[i]);
    }
  }

  return coursesTaken;
}

