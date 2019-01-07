import React from "react"
import { makeData } from "./Utils"
import PieChart from "./PieChart"
import BarChart from "./BarChart"
import "./index.css"
import Table from "./Table"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      chartData: [],
      barData: [],
      width: this.getWidth(window),
      pieOpened: false,
      barOpened: false
    }
  }

  getWidth(target) {
    return target.innerWidth > 780 ? "50%" : "100%"
  }

  componentDidMount() {
    window.addEventListener("resize", event => {
      this.setState({
        width: this.getWidth(event.target)
      })
    })
    const data = makeData()

    this.setState({
      data: data
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize")
  }

  setData = data => {
    this.setState(state => ({
      pieOpened: !state.pieOpened,
      chartData: data
    }))
  }

  setRM = data => {
    this.setState(state => ({
      barData: data,
      barOpened: !state.barOpened
    }))
  }

  render() {
    const { data, chartData, width } = this.state
    const data2 = chartData.length ? chartData : data
    const data1 = chartData.length ? data : chartData
    return (
      <div>
        <div className="chartsWrapper">
          {<PieChart width={width} data1={data1} data2={data2} />}
          {!!this.state.barData.length && (
            <BarChart width={this.state.width} data={this.state.barData} />
          )}
        </div>
        <Table
          data={this.state.data}
          setPieChartData={this.setData}
          setBarChartData={this.setRM}
        />
      </div>
    )
  }
}

export default App
