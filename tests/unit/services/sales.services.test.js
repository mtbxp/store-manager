const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../src/models/db/connection");
const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");

describe(`teste sales service`, () => {
  describe("Requisito 08 - Lista as vendas do bd - /sales - getAllSales", () => {
    describe("Caso de sucesso", () => {
      afterEach(() => {
        sinon.restore();
      });
      it("retorna um array", async function () {
        const resultExecute = [];
        sinon.stub(salesModel, "getAllSales").resolves([resultExecute]);

        const result = await salesService.getAllSales();
        expect(result).to.be.an("array");
      });
      it("o array retornado é vazio", async function () {
        const resultExecute = [];
        sinon.stub(salesModel, "getAllSales").resolves(resultExecute);

        const result = await salesService.getAllSales();
        expect(result).to.be.empty;
      });
      it("o array retornado é cheio", async function () {
        const resultExecute = [
          {
            saleId: 10,
            productId: 5,
            quantity: 4,
            date: "2022-08-15T22:36:43.000Z",
          },
        ];
        sinon.stub(salesModel, "getAllSales").resolves([resultExecute]);

        const result = await salesService.getAllSales();
        expect(result).to.be.not.empty;
      });
      it("o array retornado contém itens do tipo objeto", async function () {
        const resultExecute = [
          {
            saleId: 10,
            productId: 5,
            quantity: 4,
            date: "2022-08-15T22:36:43.000Z",
          },
        ];
        sinon.stub(salesModel, "getAllSales").resolves(resultExecute);

        const result = await salesService.getAllSales();
        expect(result[0]).to.be.an("object");
      });
      it('o array retornado contém as propriedades: "saleId", "productId", "quantity" e "date"', async function () {
        const resultExecute = [
          {
            saleId: 10,
            productId: 5,
            quantity: 4,
            date: "2022-08-15T22:36:43.000Z",
          },
        ];
        sinon.stub(salesModel, "getAllSales").resolves(resultExecute);

        const result = await salesService.getAllSales();
        expect(result[0]).to.all.keys(
          "saleId",
          "productId",
          "quantity",
          "date"
        );
      });
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
