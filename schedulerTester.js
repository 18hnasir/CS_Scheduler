const generateSchedule = require("./Scheduler");

describe("generateSchedule", () => {
    it("Creating 8 semester schedule", () => {
        expect(generateSchedule([], 15)).toEqual(8);
    })
})