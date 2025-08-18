const pool = require("../config/db");

const categoryController = {
  // List all categories
  category_list: async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM category ORDER BY name ASC");
      res.render("categories/list", { 
        categories: rows,
        title: "All Categories", 
        message: req.flash('message') || null
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).render("error", { message: "Failed to load categories" });
    }
  },

  // View single category
  category_detail: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await pool.query("SELECT * FROM category WHERE id = $1", [categoryId]);
      const items = await pool.query("SELECT * FROM item WHERE category_id = $1", [categoryId]);
      
      if (!category.rows[0]) {
        return res.status(404).render("error", { message: "Category not found" });
      }

      res.render("categories/detail", { 
        category: category.rows[0], 
        items: items.rows 
      });
    } catch (error) {
      console.error("Error fetching category details:", error);
      res.status(500).render("error", { message: "Failed to load category" });
    }
  },

  // Create form (GET)
category_create_get: (req, res) => {
  res.render("categories/form", { 
    title: "Create Category",
    category: {}, // Empty object for new category
    formAction: "/categories/create" // Explicitly set form action
  });
},


  // Create category (POST)
  category_create_post: async (req, res) => {
    try {
      const { name, description } = req.body;
      await pool.query(
        "INSERT INTO category (name, description) VALUES ($1, $2)", 
        [name, description]
      );
      req.flash('message', 'Category created successfully');
      res.redirect("/categories");
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).render("categories/form", {
        title: "Create Category",
        category: req.body, // Pass back user input
        formAction: "/categories/create",
        error: "Failed to create category"
      });
    }
  },

  // Update form (GET)
  category_update_get: async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM category WHERE id = $1", [req.params.id]);
    
    if (!rows[0]) {
      return res.status(404).render("error", { message: "Category not found" });
    }

    res.render("categories/form", { 
      title: "Update Category",
      category: rows[0],
      formAction: `/categories/${req.params.id}/update` // Explicitly set form action
    });
  } catch (error) {
    console.error("Error loading update form:", error);
    res.status(500).render("error", { message: "Failed to load update form" });
  }
},

  // Update category (POST)
  category_update_post: async (req, res) => {
    try {
      const { name, description } = req.body;
      await pool.query(
        "UPDATE category SET name=$1, description=$2 WHERE id=$3",
        [name, description, req.params.id]
      );
      req.flash('message', 'Category updated successfully');
      res.redirect(`/categories/${req.params.id}`);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).render("categories/form", {
        title: "Update Category",
        category: { ...req.body, id: req.params.id },
        formAction: `/categories/${req.params.id}/update`,
        error: "Failed to update category"
      });
    }
  },
  // Delete category (POST)
  category_delete_post: async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Fetch default category dynamically
    const defaultCategoryRes = await pool.query(
      "SELECT id FROM category WHERE name = $1",
      ["Uncategorized"]
    );
    const DEFAULT_CATEGORY_ID = defaultCategoryRes.rows[0].id;

    if (parseInt(categoryId) === DEFAULT_CATEGORY_ID) {
      req.flash('message', "Default category cannot be deleted");
      return res.redirect("/categories");
    }

    // Reassign items to default category
    await pool.query(
      "UPDATE item SET category_id = $1 WHERE category_id = $2",
      [DEFAULT_CATEGORY_ID, categoryId]
    );

    // Delete the category
    const result = await pool.query(
      "DELETE FROM category WHERE id = $1",
      [categoryId]
    );

    req.flash(
      'message',
      result.rowCount === 0 ? "Category not found or already deleted" : "Category deleted successfully"
    );
    res.redirect("/categories");

  } catch (error) {
    console.error("Error deleting category:", error);
    req.flash('message', 'Failed to delete category: ' + error.message);
    res.redirect("/categories");
  }
  }

};

module.exports = categoryController;