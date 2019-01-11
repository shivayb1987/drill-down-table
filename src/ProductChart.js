import React from "react"
import { ResponsiveContainer } from "recharts"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
const colors = ["#8884d8", "#82ca9d", "#0084ff"]
class StackedBarChart extends React.Component {
  render() {
    const { xDataKey, barKeys, width } = this.props
    return (
      <div style={{flex: 1}}>
      <ResponsiveContainer width={'99%'} height={400}>
        <BarChart
          style={{ background: "#e5e5e5" }}
          data={this.props.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={xDataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {barKeys.map((barKey, index) => (
            <Bar
              dataKey={barKey}
              key={barKey}
              stackId={"a"}
              fill={colors[index % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      </div>
    )
  }
}
export default StackedBarChart
