/* InputController.js
 * Purpose: 
 *
 * Get all of the information form the user
 * Make an array and get the array of classes that were checked
 * Double array for the GTA
 * 
*/

// This function needs to return an array
//Function returns array of all checked inputs
export function getInput() {
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
  
  //traverse each list to see if the checkbox was checked and into list
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
