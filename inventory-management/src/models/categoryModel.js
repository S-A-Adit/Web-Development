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
  try {
    // Fetch default category dynamically
    const defaultCategoryRes = await pool.query(
      "SELECT id FROM category WHERE name = $1",
      ["Uncategorized"]
    );

    if (defaultCategoryRes.rows.length === 0) {
      throw new Error("Default category 'Uncategorized' does not exist");
    }

    const DEFAULT_CATEGORY_ID = defaultCategoryRes.rows[0].id;

    // Prevent deleting the default category itself
    if (parseInt(id) === DEFAULT_CATEGORY_ID) {
      throw new Error("Cannot delete the default category");
    }

    // Reassign items to default category
    await pool.query(
      "UPDATE item SET category_id = $1 WHERE category_id = $2",
      [DEFAULT_CATEGORY_ID, id]
    );

    // Now delete the category
    const result = await pool.query(
      "DELETE FROM category WHERE id = $1",
      [id]
    );

    return result.rowCount; // number of rows deleted
  } catch (error) {
    console.error("Error in deleteCategory model:", error);
    throw error; // let the controller handle the flash message
  }
}

};

module.exports = categoryModel;
