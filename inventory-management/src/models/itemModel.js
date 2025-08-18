const pool = require("../config/db");

const itemModel = {
  async getAllItems() {
    const result = await pool.query("SELECT * FROM item ORDER BY name ASC");
    return result.rows;
  },

  async getItemsByCategory(categoryId) {
    const result = await pool.query(
      "SELECT * FROM item WHERE category_id = $1 ORDER BY name ASC",
      [categoryId]
    );
    return result.rows;
  },

  async getItemById(id) {
    const result = await pool.query("SELECT * FROM item WHERE id = $1", [id]);
    return result.rows[0];
  },

  async createItem(name, description, price, quantity, category_id) {
    const result = await pool.query(
      `INSERT INTO item (name, description, price, quantity, category_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, price, quantity, category_id]
    );
    return result.rows[0];
  },

  async updateItem(id, name, description, price, quantity, category_id) {
    const result = await pool.query(
      `UPDATE item SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5
       WHERE id = $6 RETURNING *`,
      [name, description, price, quantity, category_id, id]
    );
    return result.rows[0];
  },

  async deleteItem(id) {
    const result = await pool.query("DELETE FROM item WHERE id = $1", [id]);
    return result.rowCount; // number of rows deleted
  },
};

module.exports = itemModel;
