const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { checkAdminPassword } = require('../middleware/auth');

// GET all suppliers
router.get('/', supplierController.index);

// GET form to create new supplier
router.get('/new', checkAdminPassword, supplierController.newForm);

// POST create new supplier
router.post('/', checkAdminPassword, supplierController.create);

// GET single supplier
router.get('/:id', supplierController.show);

// GET edit form for supplier
router.get('/:id/edit', checkAdminPassword, supplierController.editForm);

// PUT update supplier
router.put('/:id', checkAdminPassword, supplierController.update);

// DELETE supplier
router.delete('/:id', checkAdminPassword, supplierController.delete);

// GET all items supplied by this supplier
router.get('/:id/items', supplierController.supplierItems);

module.exports = router;