import React from "react"
import ProductUtil from "./ProductUtil"
import ProductTable from "./ProductTable"
import ProductChart from "./ProductChart"
import products from "./products"

const headerConfig = {
  width: "4em",
  headerStyle: {
    background: "#0083ff",
    color: "white"
  }
}

const productColums = [
  {
    Header: "PROD",
    accessor: "name",
    ...headerConfig
  },
  {
    Header: "USD",
    accessor: "usd",
    ...headerConfig
  },
  {
    Header: "SGD",
    accessor: "sgd",
    ...headerConfig
  },
  {
    Header: "OCY",
    accessor: "ocy",
    ...headerConfig
  },
  {
    Header: "TOTAL",
    accessor: "total",
    ...headerConfig
  }
]

const SegmentsDropdown = ({ segments, onChange }) => (
  <select
    className="ProductChart-segments"
    name="segment"
    id="segment"
    onChange={onChange}
  >
    {segments.map(segment => (
      <option key={segment} value={segment}>
        {segment}
      </option>
    ))}
  </select>
)

const Toggle = ({ onClick, region }) => (
  <div className="ProductChart-regionFilters" onClick={onClick}>
    <button className={region === "OPAC" ? "active" : "inactive"}>OPAC</button>
    <button className={region === "Non-OPAC" ? "active" : "inactive"}>
      Non-OPAC
    </button>
  </div>
)
class Products extends React.Component {
  state = {
    products: [],
    region: "OPAC",
    segments: [],
    selectedSegment: ""
  }

  componentDidMount() {
    const productUtil = new ProductUtil(products)
    const productsList = productUtil.getProductsMap()
    const datesList = productUtil.getDatesMap()
    const segments = productUtil.getSegments()
    this.setState({
      originalList: productsList,
      products: productsList,
      originalDates: datesList,
      dates: datesList,
      segments
    })
  }

  onRegionSelect = event => {
    this.setState({
      region: event.target.innerText
    })
  }

  handleSegmentChange = e => {
    const { value } = e.target
    if (value !== "Total") {
      const filteredBySegment = products.filter(
        product => product["Segment Level 2"] === e.target.value
      )
      const productUtil = new ProductUtil(filteredBySegment)
      const productsList = productUtil.getProductsMap()
      const datesList = productUtil.getDatesMap()
      this.setState({
        products: productsList,
        dates: datesList
      })
    } else {
      this.setState({
        products: this.state.originalList,
        dates: this.state.originalDates
      })
    }
  }

  render() {
    const { segments } = this.state
    return (
      <div className="products-container">
        <div className="ProductChart-controls">
          <Toggle onClick={this.onRegionSelect} region={this.state.region} />
          <SegmentsDropdown
            segments={this.state.segments}
            onChange={this.handleSegmentChange}
          />
        </div>
        <div className={"ProductChart-content"}>
          <ProductTable data={this.state.products} columns={productColums} />
          <ProductChart
            width={this.props.width}
            data={this.state.dates}
            xDataKey="name"
            barKeys={["usd", "sgd", "ocy"]}
          />
        </div>
      </div>
    )
  }
}

export default Products
