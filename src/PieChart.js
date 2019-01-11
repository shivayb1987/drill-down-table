import React from "react"
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector
} from "recharts"
const COLORS = [
  "#1E90FF",
  "#00BFFF",
  "#6495ED",
  "#0000FF",
  "#4169E1",
  "#6495ED"
]

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
      {(percent * 100).toFixed(2)}%
    </text>
  )
}

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

class SimplePieChart extends React.Component {
  state = {
    activeIndex: -1
  }
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    })
  }

  onPieLeave = () => {
    this.setState({
      activeIndex: -1
    })
  }
  render() {
    const { data } = this.props
    return (
      <>
        <ResponsiveContainer
          width={this.props.width}
          // width="100%"
          height={400}
        >
          <PieChart>
            <Pie
              data={data || []}
              cx="50%"
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={"80%"}
              fill="#8884d8"
              dataKey="total"
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={this.onPieEnter}
              onMouseLeave={this.onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell key={entry} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <br />
            <Tooltip />
            <Legend margin={{ bottom: -30 }} />
          </PieChart>
        </ResponsiveContainer>
      </>
    )
  }
}

export default SimplePieChart
