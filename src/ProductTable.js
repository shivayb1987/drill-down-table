import React from "react"
import ReactTable from "react-table"

class ProductTable extends React.Component {
  render() {
    const { data, columns } = this.props
    return (
      <div className="products-tableContainer">
        <ReactTable
          className="-striped -highlight"
          data={data}
          columns={columns}
          defaultPageSize={10}
          showPagination={true}
          getTdProps={() => {
            return {
              style: {
                textOverflow: "initial",
                whiteSpace: "initial"
              }
            }
          }}
        />
      </div>
    )
  }
}

export default ProductTable
