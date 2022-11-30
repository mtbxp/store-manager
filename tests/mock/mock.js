const id = 1;
const newProduct = "Sabre de luz";
const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const productById = products[id - 1];

module.exports = {
  products,
  productById,
  id,
  newProduct,
};
