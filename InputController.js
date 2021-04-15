/* InputController.js
 * Purpose: 
 *
 * Get all of the information form the user
 * Make an array and get the array of classes that were checked
 * Double array for the GTA
 * 
*/

// This function needs to return an array
export function getInput(){

    // Array that will hold all of the classes that were inputted
    var myArray = []; 

    // Array holding all possible classes with their respective id's
    var ComputerScienceCoreId = ["CS110","CS112","CS211","CS262","CS306","CS310","CS321","CS330","CS367","CS471","CS483"];
    var MasonCoreId = ["WrittenCommunication", "Literature", "Arts", "WesternCivilizationWorldHistory", "SocialandBehavioralSciences", "GlobalUnderstanding"]; 
    var SeniorComputerScienceId = ["CS425","CS440","CS450","CS451","CS455","CS463","CS465","CS468","CS469","CS475","CS477","CS480","CS482","CS484","CS485","CS490","CS491","CS499","MATH446","OR481"];
    var MathematicsId = ["MATH113","MATH114","MATH125","MATH203","MATH213","STAT344"];
    var NaturalScienceId = ["BIOL103","BIOL107","CHEM211","CHEM212","GEOL101","GEOL102","PHYS160","PHYS260"];
    var CommunicationEnglishId = ["ENGH101", "COMM100", "COMM101", "ENGH302"];
    var ComputerScienceRelatedCoursesId = ["STAT354", "OR335", "OR441", "OR442", "ECE301", "ECE331", "ECE231", "ECE332", "ECE232",
      "ECE350", "ECE446", "ECE447", "ECE511", "SWE432", "SWE437", "SWE443", "SYST371", "SYST470", "PHIL371", "PHIL376", "ENGH388", "CS332", "CS351"];

    // Computer Science Core Check
    
    // Go through entire array of ComputerScienceCore Classes
    for (var i = 0; i < ComputerScienceCoreId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(ComputerScienceCoreId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(ComputerScienceCoreId[i]);
        }
    }

    // Mason Core Check
    for (var i = 0; i < MasonCoreId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(MasonCoreId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(MasonCoreId[i]);
        }
    }

    // Senior Computer Science Check
    for (var i = 0; i < SeniorComputerScienceId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(SeniorComputerScienceId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(SeniorComputerScienceId[i]);
        }
    }

    // Mathematics Check
    for (var i = 0; i < MathematicsId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(MathematicsId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(MathematicsId[i]);
        }
    }

    // Natural Science Check
    for (var i = 0; i < NaturalScienceId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(NaturalScienceId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(NaturalScienceId[i]);
        }
    }

    // Communication and English Check
    for (var i = 0; i < CommunicationEnglishId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(CommunicationEnglishId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(CommunicationEnglishId[i]);
        }
    }

    // Computer Science Related Check
    for (var i = 0; i < ComputerScienceRelatedCoursesId.length; i++){
        // Check by id if the class if taken
        if(document.getElementById(ComputerScienceRelatedCoursesId[i].checked)){
            // If the class checkbox is true, push the class to myArray
            myArray.push(ComputerScienceRelatedCoursesId[i]);
        }
    }

    // Return myArray after everything has been checked
    return myArray
}
