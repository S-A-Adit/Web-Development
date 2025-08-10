const { Category, Item } = require('../models');

exports.index = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('categories/index', { 
       title: 'All Categories',
       categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// NEW - Show form to create new category
exports.newForm = (req, res) => {
  res.render('categories/new');
};

// CREATE - Handle new category creation
exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({ name, description });
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// SHOW - Show single category with its items
exports.show = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Item,
        as: 'items'
      }]
    });
    res.render('categories/show', { category });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// EDIT - Show form to edit category
exports.editForm = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.render('categories/edit', { category });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// UPDATE - Handle category update
exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.update(
      { name, description },
      { where: { id: req.params.id } }
    );
    res.redirect(`/categories/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// DELETE - Handle category deletion
exports.delete = async (req, res) => {
  try {
    // First check if category has items
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Item, as: 'items' }]
    });

    if (category.items && category.items.length > 0) {
      return res.status(400).send('Cannot delete category with existing items');
    }

    await Category.destroy({ where: { id: req.params.id } });
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};