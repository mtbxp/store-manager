const sinon = require("sinon");
const { expect } = require("chai");
const mocks = require("../../../__tests__/_dataMock");
const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");

describe('Testa Sales camada controller', () => {
  describe("lista as vendas", () => {
    describe("checa se o retorno", () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon
          .stub(salesService, "getAllSales")
          .resolves(mocks.allProductsResponse);
      });

      after(() => {
        salesService.getAll.restore();
      });

      it("tem status 200", async () => {
        await salesController.getAllSales(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it("é um array", async () => {
        await salesController.getAllSales(request, response);
        expect(response.json.calledWith(mocks.allProductsResponse)).to.be.equal(
          true
        );
      });
    });
  });
});
