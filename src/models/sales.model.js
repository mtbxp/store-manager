const connection = require('./db/connection');

const addNewSale = async (sales) => {
  const [previousSales] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  await Promise.all(
    sales.map(async (sale) =>
      connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [previousSales.insertId, sale.productId, sale.quantity],
      )),
  );

  return { id: previousSales.insertId };
};

const getAllSales = async () => {
  const query = `
    SELECT sp.sale_id as saleId, s.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as sp ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;
    `;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const query = `
    SELECT  s.date, sp.product_id as productId, sp.quantity 
    FROM sales as s
    INNER JOIN sales_products as sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sp.sale_id, sp.product_id;
    `;
  const [result] = await connection.execute(query, [id]);
  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?;`,
    [id],
  );
  return true;
};

const salesUpdate = async ({ id, sales }) => {
  await Promise.all(
    sales.map(async (sale) =>
      connection.execute(
        `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE  product_id = ? AND sale_id = ?
    `,
        [sale.quantity, sale.productId, id],
      )),
  );
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
  addNewSale,
  salesUpdate,
};