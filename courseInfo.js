
export function getPreReq(className){

// not fully implimented

    var courses = {"CS110" : [],"CS112" : ["MATH113"], "CS211" : ["CS112"],"CS222" : ["CS112"], 
    "CS262" : ["CS211","CS110"],"CS306" : ["COMM100", "ENGH302", "CS110"], "CS310" : ["CS211", "MATH113"],"CS321" : ["CS310", "ENGH302"], "CS325" : ["CS211"],
    "CS330" : ["CS211", "MATH125"], "CS332" : ["CS321"],"CS351" : ["CS262", "CS310"], "CS367" : ["MATH125", "CS262", "CS110"],
    "CS390" : ["CS321", "CS262", "CS310"], "CS391" : ["CS310"],"CS395" : ["CS211"], "CS399" : ["CS211"],
    "CS425" : ["CS310", "CS351"], "CS426" : ["CS325", "CS425"],"CS440" : ["CS310", "CS330", "CS367"], "CS444" : ["CS310"],
    "CS445" : ["CS310", "STAT344"], "CS450" : ["CS310", "CS330"],"CS451" : ["MATH203", "CS310", "CS367"], "CS455" : ["CS367", "STAT344", "CS310"],
    "CS463" : ["CS310", "CS367", "CS330"], "CS465" : ["CS367"],"CS468" : ["CS310", "CS367"], "CS469" : ["CS330", "CS367", "STAT344"],
    "CS471" : ["CS310", "CS367"], "CS475" : ["CS310", "CS367"],"CS477" : ["CS310", "CS367"], "CS480" : ["CS310", "CS330"],
    "CS482" : ["CS310", "STAT344", "MATH203"], "CS483" : ["CS310", "CS330", "MATH125"],"CS484" : ["CS310", "STAT344"], "CS485" : ["CS262", "MATH203", "CS310"],
    "CS490" : ["CS321", "CS483"], "CS491" : ["CS321", "CS483", "CS367"],"CS498" : ["60"], "CS499" : ["CS310", "CS330"],
    "MATH113" : ["MATH105"], "MATH114" : ["MATH113"],"MATH125" : ["MATH113"], "MATH203" : ["MATH114"],
    "MATH213" : ["MATH114"], "STAT344" : ["MATH114"], "COMM101" : [],"COMM100" : [], "BIOL103" : [],
    "BIOL106" : [], "BIOL107" : ["*"],"CHEM211" : [], "CHEM213" : ["CHEM211"],
    "CHEM212" : ["*"], "CHEM214" : ["*"],"GEOL101" : [], "GEOL102" : [],
    "PHYS160" : ["MATH114"], "PHYS161" : ["*"],"PHYS260" : ["PHYS160"], "PHYS261" : ["*"],"ENGH302" : ["ENGH101", "Literature"],
    "MATH446" : ["MATH203", "CS112"], "OR481" : ["MATH203", "CS112"],"ECE445" : ["CS262", "ECE331"], "STAT354" : ["STAT344"],
    "OR335" : ["STAT344", "CS211", "CS112"], "OR441" : ["MATH203"],"OR442" : ["STAT344"], "ECE301" : ["MATH125"],
    "ECE331" : ["CS112", "PHYS261"], "ECE231" : ["CS112", "PHYS261"],"ECE332" : ["CS112", "PHYS261"], "ECE232" : ["CS112", "PHYS261"],
    "ECE350" : ["CS262", "ECE301", "ECE332", "ECE280"], "ECE446" : ["CS465", "ECE445"],"ECE447" : ["ECE350"], "ECE511" : ["CS465"],
    "SWE432" : ["MATH125", "CS321"], "SWE437" : ["MATH125", "CS310"],"SWE443" : ["CS321"], "SYST371" : ["SYST210"],
    "SYST470" : ["STAT344", "SYST210"], "PHIL371" : ["3Creds"],"PHIL376" : ["PHIL173"], "ENGH388" : ["ENGH302"], 
"ENGH101" : []};
    return courses[className];
}

export function getCredits(className){

// still needed: any math over 351, and electives

    var courses = {"CS110" : 3, "CS100" : 3,"CS112" : 4, 
    "CS101" : 2,"CS105" : 1, "CS211" : 3,"CS222" : 3, 
    "CS262" : 3,"CS306" : 3, "CS310" : 3,"CS321" : 3, "CS325" : 3,
    "CS330" : 3, "CS332" : 3,"CS351" : 3, "CS367" : 4,
    "CS390" : 3, "CS391" : 1,"CS395" : 1, "CS399" : 3,
    "CS425" : 3, "CS426" : 3,"CS440" : 3, "CS444" : 3,
    "CS445" : 3, "CS450" : 3,"CS451" : 3, "CS455" : 3,
    "CS463" : 3, "CS465" : 3,"CS468" : 3, "CS469" : 3,
    "CS471" : 3, "CS475" : 3,"CS477" : 3, "CS480" : 3,
    "CS482" : 3, "CS483" : 3,"CS484" : 3, "CS485" : 3,
    "CS490" : 3, "CS491" : 3,"CS498" : [1,2,3], "CS499" : 3,
    "CS110" : 3, "CS100" : 3,"CS110" : 3, "CS100" : 3,
    "MATH113" : 4, "MATH114" : 3,"MATH125" : 3, "MATH203" : 3,
    "MATH213" : 3, "CS100" : 3,"CS110" : 3, "CS100" : 3,
    "STAT344" : 3, "COMM101" : 3,"COMM100" : 3, "BIOL103" : 3,
    "BIOL106" : 3, "BIOL107" : 1,"CHEM211" : 3, "CHEM213" : 1,
    "CHEM212" : 3, "CHEM214" : 1,"GEOL101" : 4, "GEOL102" : 4,
    "PHYS160" : 3, "PHYS161" : 1,"PHYS260" : 3, "PHYS261" : 1,
    "CS110" : 3, "CS100" : 3,"CS110" : 3, "CS100" : 3,"ENGH302" : 3,
    "MATH446" : 3, "OR481" : 3,"ECE445" : 3, "STAT354" : 3,
    "OR335" : 3, "OR441" : 3,"OR442" : 3, "ECE301" : 3,
    "ECE331" : 3, "ECE231" : 3,"ECE332" : 3, "ECE232" : 3,
    "ECE350" : 3, "ECE446" : 3,"ECE447" : 3, "ECE511" : 3,
    "SWE432" : 3, "SWE437" : 3,"SWE443" : 3, "SYST371" : 3,
    "SYST470" : 3, "PHIL371" : 3,"PHIL376" : 3, "ENGH388" : 3, "Literature" : 3,
    "Written Communication" : 3, "Arts" : 3, "Global Understanding" : 3, "Social and Behavioral Science" : 3, "Western Civilization/World History" : 3,
"ENGH101" : 3};

    return courses[className];
}