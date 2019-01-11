import appData from "./products"
import ProductUtil from "./ProductUtil"
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

const flatten = arr => {
  return arr.reduce((flattened, el) => {
    if (el instanceof Array) {
      flattened.push(...el)
    } else {
      flattened.push(el)
    }
    return flattened
  }, [])
}

export const getSegments = () => {
  const filterBy = func => {
    return appData.filter(func)
  }
  const Util = new ProductUtil(appData)

  const balances = Util.generateProductsMap("Segment Level 2")

  balances.forEach(segment => {
    const filtered = filterBy(obj => obj["Segment Level 2"] === segment.name)
    const Util = new ProductUtil(filtered)
    const subSegments = Util.generateProductsMap("Segment Level 1")
    subSegments.forEach(sub => {
      const filtered = filterBy(obj => obj["Segment Level 1"] === sub.name)
      const Util = new ProductUtil(filtered)
      const dates = Util.getDates()
      sub.headers = generateRMHeaders(dates.sort().reverse())
      sub.children = Util.generateRMMap("RM", dates)
    })
    segment.children = subSegments
  })
  return balances
}

const headerConfig = {
  width: "4em",
  headerStyle: {
    background: "#0083ff",
    color: "white"
  }
}
export const generateRMHeaders = items => {
  const headers = items.map(item => {
    return [
      {
        ...headerConfig,
        Header: item,
        accessor: item + "-noop"
      },
      {
        ...headerConfig,
        Header: item,
        accessor: item + "-op"
      }
    ]
  })
  return [
    {
      ...headerConfig,
      Header: "RM",
      accessor: "name"
    },
    ...flatten(headers)
  ]
}

export const barChartColumns = {
  columns: [
    {
      Header: "Name",
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
      Header: "Total",
      accessor: "total",
      ...headerConfig
    }
  ]
}

export const barChartHelpers = {
  consolidateByKeys: (headers, data) => {
    const keymap = {
      noop: "Non-Operational",
      op: "Operational"
    }
    const map = new Map()
    headers.forEach(({ Header, accessor }) => {
      const noopTotal = data.reduce(
        (acc, obj) => acc - 0 + obj[`${Header}-noop`],
        0
      )
      const opTotal = data.reduce(
        (acc, obj) => acc - 0 + obj[`${Header}-op`],
        0
      )
      map.set(Header, {
        [keymap.noop]: noopTotal,
        [keymap.op]: opTotal
      })
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

export const getClients = () => {
  const ids = new Set()
  const clients = []
  appData.forEach(obj => {
    const id = obj['Customer']
    if (!ids.has(id)) {
      ids.add(id)
      clients.push({
        id: obj['Customer'],
        name: obj['Customer Name']
      })
    }
  })
  return clients
}