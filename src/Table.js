import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { barChartHelpers, barChartColumns, generateRMHeaders } from "./Utils"

class Table extends React.Component {
  state = {
    currentPieIndex: -1,
    pieIndices: [],
    barIndices: [],
    currentBarIndex: -1
  }
  setBarChartData(headers, data, index) {
    const { barIndices, currentBarIndex } = this.state
    if (this.isCurrentRowExpanded(index, currentBarIndex, barIndices)) {
      this.props.setBarChartData([])
      this.setState({
        currentBarIndex: -1,
        barIndices: this.state.barIndices.filter(i => i !== index)
      })
    } else {
      if (this.isRowExpanded(index, barIndices)) {
        this.setState({
          barIndices: barIndices.filter(i => i !== index)
        })
      } else {
        this.setState({
          currentBarIndex: index,
          barIndices: [...barIndices, index]
        })
        const consolidatedMap = barChartHelpers.consolidateByKeys(headers, data)
        const formattedArr = barChartHelpers.formatDataForBarChart(
          consolidatedMap
        )
        this.props.setBarChartData(formattedArr)
      }
    }
  }

  isCurrentRowExpanded(index, currentIndex, indices) {
    return index === currentIndex && this.isRowExpanded(index, indices)
  }

  isRowExpanded = (index, indices) => {
    return indices.includes(index)
  }

  setPieChartData(data, index) {
    const { pieIndices, currentPieIndex } = this.state
    if (this.isCurrentRowExpanded(index, currentPieIndex, pieIndices)) {
      this.props.setPieChartData([])
      this.setState({
        currentPieIndex: -1,
        pieIndices: this.state.pieIndices.filter(i => i !== index)
      })
    } else {
      if (this.isRowExpanded(index, pieIndices)) {
        this.setState({
          pieIndices: pieIndices.filter(i => i !== index)
        })
      } else {
        this.setState({
          currentPieIndex: index,
          pieIndices: [...pieIndices, index]
        })
        this.props.setPieChartData(data || [])
      }
    }
    this.resetBarChartData()
  }

  resetBarChartData = () => {
    this.setState({
      barIndices: [],
      currentBarIndex: -1
    })
    this.props.setBarChartData([])
  }
  render() {
    const { data } = this.props
    return (
      <ReactTable
        style={{ flex: 1 }}
        data={data}
        columns={barChartColumns.columns}
        defaultPageSize={5}
        className="-striped -highlight"
        SubComponent={row => {
          return (
            <div style={{ padding: "20px" }}>
              <ReactTable
                data={row.original.children}
                columns={barChartColumns.columns}
                defaultPageSize={
                  row.original.children ? row.original.children.length : 0
                }
                showPagination={false}
                SubComponent={row => {
                  return (
                    <div style={{ padding: "20px" }}>
                      <br />
                      <ReactTable
                        data={row.original.children}
                        columns={row.original.headers}
                        defaultPageSize={
                          row.original.children
                            ? row.original.children.length
                            : 0
                        }
                        showPagination={false}
                        getTdProps={() => {
                          return {
                            style: {
                              textAlign: "center",
                              textOverflow: "initial",
                              whiteSpace: "initial"
                            }
                          }
                        }}
                      />
                    </div>
                  )
                }}
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    style: {
                      textAlign: "center",
                      textOverflow: "initial",
                      whiteSpace: "initial"
                    },
                    onClick: (e, handleOriginal) => {
                      this.setBarChartData(
                        rowInfo.original.headers.slice(1),
                        rowInfo.original.children,
                        rowInfo.index
                      )

                      if (handleOriginal) {
                        handleOriginal()
                      }
                    }
                  }
                }}
              />
            </div>
          )
        }}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            style: {
              textAlign: "center",
              textOverflow: "initial",
              "white-space": "initial"
            },
            onClick: (e, handleOriginal) => {
              console.log("A Td Element was clicked!")
              console.log("it produced this event:", e)
              console.log("It was in this column:", column)
              console.log("It was in this row:", rowInfo)
              console.log("It was in this table instance:", instance)
              console.log("It has this state:", state.expanded)
              this.setPieChartData(rowInfo.original.children, rowInfo.index)

              if (handleOriginal) {
                handleOriginal()
              }
            }
          }
        }}
      />
    )
  }
}

export default Table
