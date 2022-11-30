const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const productModel = require("../../../src/models/product.model");
const productService = require("../../../src/services/product.service");

describe('testa products camada Service', () => {
  describe('testa se', () => {
    before(() => {
      sinon.stub(productModel, "getAllProducts").resolves([]);
    });

    after(() => {
      productModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const response = await productModel.getAllProducts();

      expect(response).to.be.an('array');
    })

    it('o array está vazio', async () => {
      const response = await productModel.getAllProducts();

      expect(response).to.be.empty;
    })
  })

  describe('lista os produtos por Id', () => {
    describe('testa', () => {
      before(() => {
        sinon.stub(productModel, 'getProductById').resolves([{}]);
      });

      after(() => {
        productModel.getProductById.restore();
      });

      it('se retorna um objeto', async () => {
        const [result] = await productService.getProductById(908);
        expect(result).to.be.an('object');
      });

      it('se retorna um objeto vazio', async () => {
        const [result] = await productService.getProductById(908);
        expect(result).to.be.empty;
      });
    });
  });
});
