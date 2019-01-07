const { barChartHelpers } = require("./Utils.js")
const assert = require("assert")

const map = new Map()
map.set("May 10", { operational: 10, nonOperational: 11 })
map.set("May 9", { operational: 10, nonOperational: 11 })
describe("Testing barChartHelpers object methods", () => {
  test("barChartHelpers.formatDataForBarChart", () => {
    expect(barChartHelpers.formatDataForBarChart(map)).toEqual([
      { name: "May 10", operational: 10, nonOperational: 11 },
      { name: "May 9", operational: 10, nonOperational: 11 }
    ])
  })
})
