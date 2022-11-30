const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../src/models/db/connection");
const { products, productById, id, newProduct } = require("../../mock/mock");

const productModel = require("../../../src/models/product.model");

describe("testa Model", () => {
  before(async () => {
    const execute = [products];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("testa a função getAllProducts", () => {
    it("se retorna os Produtos", async () => {
      const getAllProducts = await productModel.getAllProducts();
      expect(getAllProducts).to.be.not.empty;
      expect(getAllProducts).to.be.deep.equal(products);
    });
    it("testa se retorna um array", async () => {
      const getProducts = await productModel.getAllProducts();
      expect(getProducts).to.be.an("array");
    });
  });

  describe("testa a função getProductsID", () => {
    it("se retorna o id", async () => {
      const getProductById = await productModel.getProductById(id);
      expect(getProductById).to.be.deep.equal(productById);
      expect(getProductById).to.be.an("object");
    });
  });
});

describe("testa Model", () => {
  before(async () => {
    const execute = [products];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("Testa addNewProduct", () => {
    it("se foi adicionado novo produto", async () => {
      const newProduct = await productModel.newProduct();
      expect(newProduct).to.be.not.empty;
      expect(newProduct).to.be.an("object");
    });
  });
});

describe("testa Model Update", () => {
  before(async () => {
    const execute = [products];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("testa a função updateProduct", () => {
    it("testa se retorna novo produto", async () => {
      const updateProduct = await productModel.updateProduct({ id, newProduct });
      expect(updateProduct).to.be.not.empty;
      expect(updateProduct).to.be.an("array");
    });
  });
});
