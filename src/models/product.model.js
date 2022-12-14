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
  const query = 'INSERT INTO products (name) VALUE (?);';
  const [result] = await connection.execute(query, [name]);
  const obj = {
    id: result.insertId,
    name,
  };
  return obj;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  const result = await connection.execute(query, [id]);
  return result;
};

const getProductByQuery = async (query) => {
  const [products] = await connection.execute(
    `
  SELECT * FROM StoreManager.products WHERE name LIKE ?`,
    [`%${query}%`],
  );

  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  deleteProduct,
  updateProduct,
  getProductByQuery,
};
