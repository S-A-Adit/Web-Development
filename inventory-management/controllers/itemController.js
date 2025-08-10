const { Item, Category, Supplier } = require('../models');

module.exports = {
  // List all items
  index: async (req, res) => {
    try {
      const items = await Item.findAll({
        include: [Category, Supplier]
      });
      res.render('Item', { items });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Show form to create new item
  newForm: async (req, res) => {
    try {
      const categories = await Category.findAll();
      const suppliers = await Supplier.findAll();
      res.render('items/new', { categories, suppliers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Create new item
  create: async (req, res) => {
    try {
      await Item.create(req.body);
      res.redirect('/items');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Show single item
  show: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id, {
        include: [Category, Supplier]
      });
      res.render('items/show', { item });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Show edit form
  editForm: async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      const categories = await Category.findAll();
      const suppliers = await Supplier.findAll();
      res.render('items/edit', { item, categories, suppliers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Update item
  update: async (req, res) => {
    try {
      await Item.update(req.body, {
        where: { id: req.params.id }
      });
      res.redirect(`/items/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  // Delete item
  delete: async (req, res) => {
    try {
      await Item.destroy({
        where: { id: req.params.id }
      });
      res.redirect('/items');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
};