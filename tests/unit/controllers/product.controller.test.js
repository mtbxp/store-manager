const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const productService = require("../../../src/services/product.service");
const productController = require("../../../src/controllers/product.controller");
const { expect } = require("chai");

describe("testa a função GetAllProducts", () => {
  describe("", () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "getAllProducts").resolves([]);
    });
    after(() => {
      productService.getAllProducts.restore();
    });

    it(" se retorna status 200", async () => {
      await productController.getProduct(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it(" se retorna um array vazio", async () => {
      await productController.getProduct(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
  });

  describe("Testa se ao retornar o produto", () => {
    const res = {};
    const req = {};
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getAllProducts")
        .resolves([{ id: 1, name: "Martelo de Thor" }]);
    });
    after(() => {
      productService.getAllProducts.restore();
    });

    it("retorna status 200", async () => {
      await productController.getProduct(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("retorna o produto", async () => {
      await productController.getProduct(req, res);
      expect(
        res.json.calledWith([{ id: 1, name: "Martelo de Thor" }])
      ).to.be.equal(true);
    });
  });
});

describe("Chama a função GetProductById", () => {
  describe("se o produto não existe", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getProductById").resolves(null);
    });

    after(() => {
      productService.getProductById.restore();
    });

    it('retorna codigo 404', async () => {
      await productController.getProductById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });

  describe("produto é encontrado", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, "getProductById").resolves({
        id: 1,
        name: "Martelo de Thor",
      });
    });

    after(() => {
      productService.getProductById.restore();
    });

    it('retorna codigo 200', async () => {
      await productController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna o objeto', async () => {
      await productController.getProductById(request, response);

      expect(
        response.json.calledWith({
          id: 1,
          name: "Martelo de Thor",
        })
      ).to.be.equal(true);
    });
  });
});

describe("Ao chamar a função newProduct", () => {
  describe("testa se", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, "newProduct").resolves(false);
    });

    after(() => {
      productService.newProduct.restore();
    });
  });

  describe("o produto é inserido com sucesso", () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'batatinha',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'newProduct').resolves(
        [{
          "id": 1,
          "name": "batatinha",
        }]
      );
    });

    after(() => {
      productService.newProduct.restore();
    });

    it("é retornado o produto com status 200", async () => {
      await productController.newProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe("Testa a função updateProduct", () => {
  describe("Testa se ao atualizar", () => {
    const res = {};
    const req = {};
    before(() => {
      req.params = { id: 1 };
      req.body = { name: "Batatinha" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "updateProduct").resolves([
        {
          id: 1,
          name: "Batatinha",
        },
      ]);
    });
    after(() => {
      productService.updateProduct.restore();
    });

    it("retorna o objeto", async () => {
      await productController.updateProduct(req, res);
      expect(
        res.json.calledWith([
          {
            id: 1,
            name: "Martelo do Batman",
          },
        ])
      ).to.be.equal(false);
    });
  });

  describe("Ao buscar um produto específico", () => {
    const res = {};
    const req = { query: { q: "martelo" } };
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "getProductByQuery").resolves({
        id: 1,
        name: "Martelo de Thor",
      });
    });
    after(function () {
      productService.getProductByQuery.restore();
    });
    it("retorna 200 ao encontrar", async () => {
      await productController.getProductByQuery(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
describe("Testa a função deleteProduct", () => {
  describe("Testa se", () => {
    afterEach(() => {
      sinon.restore();
    })
  });
    it("o objeto retornado é vazio", async function () {
      const req = {};
      const res = {};

      req.params = { id: 11 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "deleteProduct").resolves(null);

      await productController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(
        true
      );
  });
});
