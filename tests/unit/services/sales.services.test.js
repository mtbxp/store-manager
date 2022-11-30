const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../src/models/db/connection");
const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

describe(`teste sales service`, () => {
  describe("teste", () => {
    before(() => {
      sinon.stub(salesModel, "getAllSales").resolves([]);
    });

    after(() => {
      salesModel.getAllSales.restore();
    });

    it("se retorna um array", async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.a("array");
    });

    it("se o array é vazio", async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.empty;
    });
  });

  describe("lista as vendas pelo Id", () => {
    describe("se não existe", () => {
      before(() => {
        sinon.stub(salesModel, "getSaleById").resolves([{}]);
      });

      after(() => {
        salesModel.getSaleById.restore();
      });

      it("se retorna um objeto", async () => {
        const [result] = await salesService.getSaleById(988);
        expect(result).to.be.an("object");
      });

      it("se retorna um objeto vazio", async () => {
        const [result] = await salesService.getSaleById(988);
        expect(result).to.be.empty;
      });
    });
  });
});
