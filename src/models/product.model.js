const connection = require('./db/connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.execute(query);
  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const newProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  return {
    id: result.insertId,
    name,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
};
