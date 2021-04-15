/* InputController.js
 * Purpose: 
 *
 * Get all of the information form the user
 * Make an array and get the array of classes that were checked
 * Double array for the GTA
 * 
*/

/* Import statements for functions from other js files */
import { getPreReq } from './courseInfo.js';
import { getCredits } from './courseInfo.js';
import { generateSchedule } from './Scheduler.js';

// This function needs to return an array
export function getInput(){

    // Array that will hold all of the classes that were inputted
    var myArray = []; 

    // Computer Science Core Check
    if (document.getElementById("CS110").checked){
        myArray.push("CS110");
        alert("Pushed CS110 to returned myArray");
    }

    // Senior Computer Science Check

    // Mathematics Check

    // Natural Science Check

    // Computer Science Related Check

    // Communication and English Check



}