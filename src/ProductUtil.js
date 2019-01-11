const KEYS_MAP = {
  USD: "BALANCE AMOUNT",
  SGD: "BALANCE AMOUNT",
  OCY: "BALANCE AMOUNT",
  CB: "Commercial Banking",
  CIB: "Corporates Institutional",
  Operational: "Operational",
  NonOperational: "Non-Operational",
  name: "Product Decription",
  uploadDate: "Upload Date",
  segment:  "Segment Level 2"
}

const CURRENCIES = {
  USD: "USD",
  SGD: "SGD",
  OCY: "OCY",
  TOTAL: "TOTAL"
}

const PRODUCT_TABGS = {
  Operational: "Operational",
  NonOperational: "Non-Operational"
}

const getUsd = product =>
  product.CCY === CURRENCIES.USD ? parseFloat(product[KEYS_MAP.USD]) : 0
const getSgd = product =>
  product.CCY === CURRENCIES.SGD ? parseFloat(product[KEYS_MAP.SGD]) : 0
const getOcy = product =>
  product.CCY !== CURRENCIES.USD && product.CCY !== CURRENCIES.SGD
    ? parseFloat(product[KEYS_MAP.USD])
    : 0
const getTotal = product => getUsd(product) + getSgd(product) + getOcy(product)

const getNoopCount = product =>
  product["Product Tag"] === KEYS_MAP.NonOperational ? 1 : 0
const getOpCount = product =>
  product["Product Tag"] === KEYS_MAP.Operational ? 1 : 0
class ProductUtil {
  constructor(products) {
    this.products = products
  }

  getSegments = () => {
    const segments = new Set()
    segments.add('Total')
    this.products.forEach(product => {
      segments.add(product['Segment Level 2'])
    })
    return Array.from(segments)
  }

  generateProductsMap = key => {
    const productsKeyMap = new Map()
    this.products.forEach(product => {
      if (productsKeyMap.has(product[key])) {
        const currencyMap = productsKeyMap.get(product[key])
        currencyMap.set(
          CURRENCIES.USD,
          currencyMap.get(CURRENCIES.USD) + getUsd(product)
        )
        currencyMap.set(
          CURRENCIES.SGD,
          currencyMap.get(CURRENCIES.SGD) + getSgd(product)
        )
        currencyMap.set(
          CURRENCIES.OCY,
          currencyMap.get(CURRENCIES.OCY) + getOcy(product)
        )
        currencyMap.set(
          CURRENCIES.TOTAL,
          currencyMap.get(CURRENCIES.TOTAL) + getTotal(product)
        )
        currencyMap.set(KEYS_MAP.segment, product[KEYS_MAP.segment])
      } else {
        const currencyMap = new Map()
        currencyMap.set(CURRENCIES.USD, getUsd(product))
        currencyMap.set(CURRENCIES.SGD, getSgd(product))
        currencyMap.set(CURRENCIES.OCY, getOcy(product))
        currencyMap.set(CURRENCIES.TOTAL, getTotal(product))
        // currencyMap.set(KEYS_MAP.segment, product[KEYS_MAP.segment])
        productsKeyMap.set(product[key], currencyMap)
      }
    })
    const productsArr = []
    for (let [key, currencyMap] of productsKeyMap.entries()) {
      productsArr.push({
        name: key,
        // segment: currencyMap.get(KEYS_MAP.segment),
        usd: currencyMap.get(CURRENCIES.USD).toFixed(2),
        sgd: currencyMap.get(CURRENCIES.SGD).toFixed(2),
        ocy: currencyMap.get(CURRENCIES.OCY).toFixed(2),
        total: parseFloat(currencyMap.get(CURRENCIES.TOTAL).toFixed(2))
      })
    }
    return productsArr
  }

  getRMs() {
    const rms = []
    this.products.forEach(obj => {
      if (!rms.includes(obj["RM"])) {
        rms.push(obj["RM"])
      }
    })
    return rms
  }
  getDates() {
    const rms = []
    this.products.forEach(obj => {
      if (!rms.includes(obj[KEYS_MAP.uploadDate])) {
        rms.push(obj[KEYS_MAP.uploadDate])
      }
    })
    return rms
  }
  generateRMMap = (key, dates) => {
    const productsKeyMap = new Map()
    this.products.forEach(product => {
      if (productsKeyMap.has(product[key])) {
        const rmMap = productsKeyMap.get(product[key])
        dates.forEach(date => {
          if (product[KEYS_MAP.uploadDate] === date) {
            rmMap.set(
              `${date}-noop`,
              rmMap.get(`${date}-noop`) + getNoopCount(product)
            )
            rmMap.set(
              `${date}-op`,
              rmMap.get(`${date}-op`) + getOpCount(product)
            )
          }
        })
      } else {
        const rmMap = new Map()
        dates.forEach(date => {
          rmMap.set(`${date}-noop`, getNoopCount(product))
          rmMap.set(`${date}-op`, getOpCount(product))
        })
        productsKeyMap.set(product[key], rmMap)
      }
    })
    const rms = []
    for (let [key, rmMap] of productsKeyMap.entries()) {
      rms.push({
        name: key,
        ...dates.reduce((acc, date) => {
          return {
            ...acc,
            [`${date}-noop`]: rmMap.get(`${date}-noop`),
            [`${date}-op`]: rmMap.get(`${date}-op`)
          }
        }, {})
      })
    }
    return rms
  }

  getProductsMap() {
    return this.generateProductsMap(KEYS_MAP.name)
  }

  getDatesMap() {
    return this.generateProductsMap(KEYS_MAP.uploadDate)
  }
}

export default ProductUtil
