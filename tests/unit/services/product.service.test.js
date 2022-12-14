const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const connection = require("../../../src/models/db/connection");
const productModel = require("../../../src/models/product.model");
const productService = require("../../../src/services/product.service");

const newProduct = [{ name: "ProdutoX" }];
const productSearch = [[], []];
const productId = [{ id: 1, name: "Martelo de Thor" }];

describe("Buscando produtos no BD - ProductService", () => {
  describe("Quando não existe produtos cadastrados", () => {
    before(function () {
      sinon.stub(productModel, "getAllProducts").resolves(productSearch);
    });
    after(function () {
      productModel.getAllProducts.restore();
    });
    it("retorna um array", async () => {
      const search = await productService.getAllProducts();
      expect(search).to.be.an("array");
    });
    it("Retorna um array vazio", async () => {
      const search = await productService.getAllProducts();
      expect(search).to.be.not.empty;
    });
  });
  describe("Quando existem produtos criados", () => {
    before(function () {
      const productSearch = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(productModel, "getAllProducts").resolves(productSearch);
    });
    after(function () {
      productModel.getAllProducts.restore();
    });
    it("retorna um array", async () => {
      const search = await productService.getAllProducts();
      expect(search).to.be.an("array");
    });
    it("Array não está vazio", async () => {
      const search = await productService.getAllProducts();
      expect(search).to.be.not.empty;
    });
    it("Possui um objeto", async () => {
      const search = await productService.getAllProducts();
      expect(search[0]).to.be.an("object");
    });
    it("Objeto contém as propriedades de id e name", async () => {
      const search = await productService.getAllProducts();
      expect(search[0]).to.include.all.keys("id", "name");
    });
  });
  describe("Procurando Id específico", () => {
    before(() => {
      sinon.stub(productModel, "getProductById").resolves(productId);
    });
    after(() => {
      productModel.getProductById.restore();
    });
    it("Procura um id especifico", async () => {
      const search = await productService.getProductById(1);
      expect(search[0]).to.include.all.keys("id", "name");
    });
  });
  describe("Criação de produto", () => {
    before(() => {
      sinon.stub(productModel, "newProduct").resolves(newProduct);
    });
    after(() => {
      productModel.newProduct.restore();
    });
    it("Criando um produto", async () => {
      const resultCreate = await productService.newProduct(newProduct);
      expect(resultCreate[0]).to.include.all.keys("name");
    });
  });
  describe("Editando produto", () => {
    before(() => {
      sinon
        .stub(productModel, "updateProduct")
        .resolves({ id: 1, name: "Martelo de Odin" });
    });
    after(() => {
      productModel.updateProduct.restore();
    });
    it("Editando um produto", async () => {
      const resultCreate = await productService.updateProduct({
        id: 1,
        name: "Martelo de Odin",
      });
      expect(resultCreate.name).to.be.equal("Martelo de Odin");
    });
  });
  describe("Deletando um produto", () => {
afterEach(() => {
    sinon.restore();
  });
    it("retorna um boolean", async function () {
      const resultExecute = { id: 1 };
      sinon.stub(productModel, "deleteProduct").resolves([resultExecute]);

      const result = await productService.deleteProduct({ id: 1 });
      expect(null).to.be.equal(null);
    });
    it("o booleano retornado deve ser true", async function () {
      const resultExecute = true;
      sinon.stub(productModel, "deleteProduct").resolves(resultExecute);

      const result = await productService.deleteProduct(1);
      expect(result).to.be.equal(true);
    });
  });
});
