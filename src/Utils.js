const namor = require("namor")
const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}
const generateRandomWord = () => {
  const word = namor.generate({ words: 1, numbers: 0 })
  return capitalizeWord(word)
}

const capitalizeWord = word => {
  return word[0].toUpperCase() + word.slice(1)
}

const newPerson = () => {
  const usd = Math.floor(Math.random() * 100000)
  const sgd = Math.floor(Math.random() * 60000)
  const ocy = Math.floor(Math.random() * 80000)

  return {
    name: generateRandomWord(),
    usd,
    sgd,
    ocy,
    total: usd + sgd + ocy
  }
}

const repeatPattern = times => {
  let repeated = {}
  for (let i = 1; i < times; i++) {
    repeated = {
      ...repeated,
      [`noop${i}`]: Math.floor(Math.random() * 10),
      [`op${i}`]: Math.floor(Math.random() * 10)
    }
  }
  return repeated
}

const newRM = (d, i, arr) => {
  return {
    rm: generateRandomWord(),
    ...repeatPattern(arr.length)
  }
}

export function makeData(len = 3) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(d => {
        return {
          ...newPerson(),
          children: range(5).map(newRM)
        }
      })
    }
  })
}

export const barChartColumns = {
  columns: [
    {
      Header: "Name",
      accessor: "name",
      width: "4em"
    },
    {
      Header: "USD",
      accessor: "usd",
      width: "4em"
    },
    {
      Header: "SGD",
      accessor: "sgd",
      width: "4em"
    },
    {
      Header: "OCY",
      accessor: "ocy",
      width: "4em"
    },
    {
      Header: "Total",
      accessor: "total",
      width: "4em"
    }
  ],
  rmColumns: [
    {
      Header: "RM",
      accessor: "rm",
      width: "4em"
    },
    {
      Header: "May 10",
      accessor: "noop1",
      width: "4em"
    },
    {
      Header: "May 10",
      accessor: "op1",
      width: "4em"
    },
    {
      Header: "May 9",
      accessor: "noop2",
      width: "4em"
    },
    {
      Header: "May 9",
      accessor: "op2",
      width: "4em"
    },
    {
      Header: "May 8",
      accessor: "noop3",
      width: "4em"
    },
    {
      Header: "May 8",
      accessor: "op3",
      width: "4em"
    },
    {
      Header: "May 7",
      accessor: "noop4",
      width: "4em"
    },
    {
      Header: "May 7",
      accessor: "op4",
      width: "4em"
    }
  ]
}

export const barChartHelpers = {
  consolidateByKeys: (headers, data) => {
    const keymap = {
      noop: "nonOperational",
      op: "operational"
    }
    const map = new Map()
    headers.forEach(({ Header, accessor }) => {
      const nonOpTotal = data.reduce(
        (total, entry) => total + entry[accessor],
        0
      )
      if (map.has(Header)) {
        map.set(Header, {
          ...map.get(Header),
          [keymap[accessor.replace(/[0-9]+/, "")]]: nonOpTotal
        })
      } else {
        map.set(Header, {
          [keymap[accessor.replace(/[0-9]+/, "")]]: nonOpTotal
        })
      }
    })
    return map
  },
  formatDataForBarChart: varMap => {
    return Array.from(varMap.entries()).map(([key, value]) => {
      return {
        name: key,
        ...value
      }
    })
  }
}
