import ProductUtil from "./ProductUtil.js"
import products from "./products"
const assert = require("assert")

describe("Generating data structure for Products Tab", () => {
  test("getProductsMap", () => {
    const Util = new ProductUtil(products)
    expect(Util.getProductsMap()).toEqual()
  })
})

describe("Generating data structure for Products Tab", () => {
  test("getDatesMap", () => {
    const Util = new ProductUtil(products)
    expect(Util.getDatesMap()).toEqual()
  })
})
