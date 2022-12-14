const { expect } = require("chai");
const { before, after } = require("mocha");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const connection = require("../../../src/models/db/connection");

const sale = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
];
const execute = [[], []];

describe("Testa a Camada Model", () => {
  describe("Caso não haja vendas, testa se", () => {
    before (() => {
      sinon.stub(connection, "execute").resolves(execute);
    });
    after (() => {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an("array");
    });
    it("retorna um array vazio", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.empty;
    });
  });
  describe("Caso haja vendas, testa se", () => {
    before(() => {
      const execute = [{ id: 1, name: "Martelo de Thor" }];
      sinon.stub(connection, "execute").resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an("object");
    });
    it("o array não está vazio", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.not.empty;
    });
    it("é um objeto", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an("object");
    });
    it(" o objeto possui a propriedade name", async () => {
      const result = await salesModel.getAllSales();
      expect(result).to.include.key("name");
    });
  });
  describe("Ao executar a função getSalesById, testa se", () => {
    before(() => {
      sinon.stub(connection, "execute").resolves(sale);
    });
    after(() => {
      connection.execute.restore();
    });
    it("encontra o id indicado e o mesmo possui a propriedade date", async () => {
      const result = await salesModel.getSaleById(1);
      expect(result).to.include.key("date");
    });
  });
});