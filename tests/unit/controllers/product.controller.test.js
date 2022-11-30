const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const productService = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/product.controller');
const { products } = require('../../mock/mock')

describe('testa a função getAllProducts na camada Controller', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {}
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'getAllProducts').resolves(true);
    })

    after(() => {

      sinon.restore();
    })
    it('testa se retorna um array', async () => {
      await productController.getProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

 describe('testa a função getProductById na camada Controller', async () => {
  describe('se acha o id', () => {
  const req = {};
  const res = {};
      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productService, "getProductById")
          .resolves(products);
      });
      after(() => {
        productService.getProductById.restore();
      });

      it("testa se retorna um array", async () => {
        await productController.getProductById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(products)).to.be.equal(true);
    });
  });
});

  describe('se não achar o id', () => {

    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 920,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productService, 'getProductById').resolves(null);
    })

    after(() => {

      sinon.restore();
    })

    it('testa se o erro 404 é chamado', async () => {
      await productController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

  });

describe('testa se a função newProduct ', async () => {
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

      sinon.restore();
    });
    it('retorna array', async () => {
      await productController.newProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('retorna um id', async () => {
      await productController.newProduct(request, response);
      expect(response.json).to.have.a.property('id');
    });
  });
