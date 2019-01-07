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
class StackedBarChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width={this.props.width} height={400}>
        <BarChart
          data={this.props.data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nonOperational" stackId="a" fill="#8884d8" />
          <Bar dataKey="operational" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
export default StackedBarChart
