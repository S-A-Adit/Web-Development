const pool = require("../config/db");

const categoryModel = {
  async getAllCategories() {
    const result = await pool.query("SELECT * FROM category ORDER BY name ASC");
    return result.rows;
  },

  async getCategoryById(id) {
    const result = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
    return result.rows[0];
  },

  async createCategory(name, description) {
    const result = await pool.query(
      "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    return result.rows[0];
  },

  async updateCategory(id, name, description) {
    const result = await pool.query(
      "UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    return result.rows[0];
  },

  async deleteCategory(id) {
    // Will delete category (if cascade set, items deleted too)
    const result = await pool.query("DELETE FROM category WHERE id = $1", [id]);
    return result.rowCount; // number of rows deleted
  },
};

module.exports = categoryModel;
