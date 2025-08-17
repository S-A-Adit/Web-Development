const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Verify all controller methods exist
console.log({
  list: typeof categoryController.category_list,
  detail: typeof categoryController.category_detail,
  createGet: typeof categoryController.category_create_get,
  createPost: typeof categoryController.category_create_post,
  updateGet: typeof categoryController.category_update_get,
  updatePost: typeof categoryController.category_update_post
});


// Corrected route order:
router.get("/", categoryController.category_list);
router.get("/create", categoryController.category_create_get);  // Specific route first
router.post("/create", categoryController.category_create_post); // Specific route first
router.get("/:id", categoryController.category_detail);         // Parameterized routes after
router.get("/:id/update", categoryController.category_update_get);
router.post("/:id/update", categoryController.category_update_post);
// Add delete routes if needed

module.exports = router;
