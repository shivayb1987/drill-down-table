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
  state = {
    offsetY: 20
  }

  handleScroll = event => {
    setTimeout(() => {
      this.setState({
        offsetY: window.pageYOffset || document.documentElement.scrollTop
      })
    }, 200)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.stopScroll) {
      window.removeEventListener("scroll", this.handleScroll)
      this.setState({
        offsetY: 20
      })
    }
    if (
      this.props.stopScroll !== nextProps.stopScroll &&
      nextProps.stopScroll === false
    ) {
      window.addEventListener("scroll", this.handleScroll)
    }
  }

  componentDidMount() {
    !this.props.stopScroll &&
      window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    return (
      <div
        style={{
          marginTop: this.state.offsetY,
          width: "100%",
          transition: "margin-top 500ms ease-in"
        }}
      >
        <ResponsiveContainer width={"80%"} height={400}>
          <BarChart data={this.props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Non-Operational" stackId="a" fill="#0000FF" />
            <Bar dataKey="Operational" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
export default StackedBarChart
