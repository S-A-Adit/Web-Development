const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkAdminPassword } = require('../middleware/auth');

router.get('/', categoryController.index);
router.get('/new', categoryController.newForm);
router.post('/', checkAdminPassword, categoryController.create);
router.get('/:id', categoryController.show);
router.get('/:id/edit', checkAdminPassword, categoryController.editForm);
router.put('/:id', checkAdminPassword, categoryController.update);
router.delete('/:id', checkAdminPassword, categoryController.delete);

module.exports = router;