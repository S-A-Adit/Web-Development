const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { checkAdminPassword } = require('../middleware/auth');

// GET all items
router.get('/', itemController.index);

// GET form to create new item
router.get('/new', checkAdminPassword, itemController.newForm);

// POST create new item
router.post('/', checkAdminPassword, itemController.create);

// GET single item
router.get('/:id', itemController.show);

// GET edit form for item
router.get('/:id/edit', checkAdminPassword, itemController.editForm);

// PUT update item
router.put('/:id', checkAdminPassword, itemController.update);

// DELETE item
router.delete('/:id', checkAdminPassword, itemController.delete);

module.exports = router;