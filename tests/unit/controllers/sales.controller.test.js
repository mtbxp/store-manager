const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesService = require("../../../src/services/sales.service");
const salesController = require("../../../src/controllers/sales.controller");

describe("Retorna todas as vendas", () => {
  describe("se caso sucesso", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna um array com status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const resultExecute = [
        {
          saleId: 1,
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getAllSales").resolves(resultExecute);

      await salesController.getAllSales(request, response);

      const result = response.json.args[0][0];

      expect(result).to.be.an("array");
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
    it("retorna um array com ao menos um resultado e status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const resultExecute = [
        {
          saleId: 1,
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getAllSales").resolves(resultExecute);

      await salesController.getAllSales(request, response);

      const result = response.json.args[0][0];

      expect(result).to.be.not.empty;
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
    it("retorna um array com propriedades e status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const resultExecute = [
        {
          saleId: 1,
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getAllSales").resolves(resultExecute);

      await salesController.getAllSales(request, response);

      const [result] = response.json.args[0][0];

      expect(result).to.be.an("object");
      expect(result).to.have.all.keys(
        "saleId",
        "date",
        "productId",
        "quantity"
      );
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
  });
  describe("em caso de nao sucesso", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna um erro", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const resultExecute = new Error("Error");
      Sinon.stub(salesService, "getAllSales").rejects(resultExecute);

      try {
        await salesController.getAllSales(request, response);
      } catch (err) {
        expect(err).to.be.an("error");
      }
    });
  });
});

describe("salesController getSaleById", () => {
  describe("getSaleById caso sucess", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna um array com status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 1 };

      const resultExecute = [
        {
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getSaleById").resolves(resultExecute);

      await salesController.getSaleById(request, response);

      const result = response.json.args[0][0];

      expect(result).to.be.an("array");
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
    it("retorna um array vazio e status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 1 };

      const resultExecute = [
        {
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getSaleById").resolves(resultExecute);

      await salesController.getSaleById(request, response);

      const result = response.json.args[0][0];

      expect(result).to.be.an("array");
      expect(result).to.not.be.empty;
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
    it("retorna um array de objetos e status 200", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 1 };

      const resultExecute = [
        {
          date: "2022-08-16T17:35:10.000Z",
          productId: 1,
          quantity: 5,
        },
      ];
      Sinon.stub(salesService, "getSaleById").resolves(resultExecute);

      await salesController.getSaleById(request, response);

      const [result] = response.json.args[0][0];

      expect(result).to.be.an("object");
      expect(result).to.have.all.keys("date", "productId", "quantity");
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resultExecute)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
  });
  describe("getSaleById case not OK", () => {
    afterEach(() => {
      Sinon.restore();
    });
    it("retorna um erro e status 400", async () => {
      const request = {};
      const response = {};

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      request.params = { id: 5 };

      const resultExecute = [];
      Sinon.stub(salesService, "getSaleById").resolves(resultExecute);

      await salesController.getSaleById(request, response);

      const result = response.json.args[0][0];

      expect(result).to.be.an("object");
      expect(result).to.be.keys("message");
      expect(result.message).to.be.equals("Sale not found");
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.status.calledOnce).to.be.true;
      expect(response.json.calledOnce).to.be.true;
    });
    it("retorna um erro", async () => {
      const request = {};
      const response = {};
      request.params = { id: 5 };

      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();

      const resultExecute = new Error("Error");
      Sinon.stub(salesService, "getSaleById").rejects(resultExecute);

      try {
        await salesController.getSaleById(request, response);
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });
  });
});

