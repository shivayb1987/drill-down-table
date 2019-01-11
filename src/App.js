import React from "react"
import { makeData, getSegments } from "./Utils"
import PieChart from "./PieChart"
import BarChart from "./BarChart"
import Clients from "./Clients"
import "./index.css"
import Table from "./Table"
import Tabs from "./Tabs"
import Products from "./ProductsComponent"
const TABS = ["Daily Balances", "Products", "Clients"]

class App extends React.Component {
  state = {
    width: 100
  }

  getWidth(target) {
    return target.innerWidth > 968 ? 50: 100
  }

  handleResize = event => {
    this.setState({
      width: this.getWidth(event.target)
    })
  }

  componentDidMount() {
    console.log("mounted")
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    console.log("unmounted")
    window.removeEventListener("resize", this.handleResize)
  }

  render() {
    return (
      <div>
        <Tabs items={TABS}>
          <DailyBalance width={`${this.state.width}%`} />
          <Products width={`${this.state.width}%`} />
          <Clients />
        </Tabs>
      </div>
    )
  }
}

class DailyBalance extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      chartData: [],
      barData: [],
      pieOpened: false,
      barOpened: false
    }
  }

  componentDidMount() {
    const products = getSegments()
    this.setState({
      data: products
    })
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
    const { chartData, data } = this.state
    return (
      <div className="DailyBalance-container">
        <Table
          data={this.state.data}
          setPieChartData={this.setData}
          setBarChartData={this.setRM}
        />
        <div className="chartsWrapper">
          {!this.state.barData.length && (
            <PieChart
              width={this.props.width}
              data={chartData.length ? chartData : data}
            />
          )}
          {!!this.state.barData.length && (
            <BarChart stopScroll={window.innerWidth < 600} width={this.props.width} data={this.state.barData} />
          )}
        </div>
      </div>
    )
  }
}
export default App
