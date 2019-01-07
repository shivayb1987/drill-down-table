import React from "react"
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {(percent * 100).toFixed(2)}
    </text>
  )
}

class SimplePieChart extends React.Component {
  onPieEnter(args) {
    console.log("on hover", args)
  }
  render() {
    const { data1, data2 } = this.props
    return (
      <>
        <ResponsiveContainer width={this.props.width} height={400}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              data={this.props.data2 || []}
              cx="50%"
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={data1.length ? 60 : 0}
              outerRadius={160}
              fill="#8884d8"
              dataKey="total"
            >
              {this.props.data2.map((entry, index) => (
                <Cell key={entry} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              payload={this.props.data2.map((entry, index) => ({
                color: COLORS[index % COLORS.length],
                value: entry.name
              }))}
            />
            <Pie
              data={this.props.data1}
              cx="50%"
              cy={200}
              outerRadius={60}
              labelLine={false}
              fill="#8884d8"
              dataKey="total"
              label={renderCustomizedLabel}
            />
            {this.props.data2.map((entry, index) => (
              <Cell key={entry} />
            ))}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </>
    )
  }
}

export default SimplePieChart
