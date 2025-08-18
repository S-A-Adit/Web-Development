const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Corrected route order:
router.get("/", categoryController.category_list);
router.get("/create", categoryController.category_create_get);  // Specific route first
router.post("/create", categoryController.category_create_post); // Specific route first
router.get("/:id", categoryController.category_detail);         // Parameterized routes after
router.get("/:id/update", categoryController.category_update_get);
router.post("/:id/update", categoryController.category_update_post);
// Add delete routes if needed
router.get("/:id/delete", categoryController.category_delete_post);
module.exports = router;
