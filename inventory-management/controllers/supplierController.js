const { Supplier, Item } = require('../models');

module.exports = {
    // List all suppliers
    index: async (req, res) => {
        try {
            const suppliers = await Supplier.findAll();
            res.render('suppliers/index', { suppliers });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Show form to create new supplier
    newForm: (req, res) => {
        res.render('suppliers/new');
    },

    // Create new supplier
    create: async (req, res) => {
        try {
            await Supplier.create(req.body);
            res.redirect('/suppliers');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Show single supplier
    show: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id, {
                include: [{
                    model: Item,
                    as: 'items'
                }]
            });
            res.render('suppliers/show', { supplier });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Show edit form
    editForm: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            res.render('suppliers/edit', { supplier });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Update supplier
    update: async (req, res) => {
        try {
            await Supplier.update(req.body, {
                where: { id: req.params.id }
            });
            res.redirect(`/suppliers/${req.params.id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Delete supplier
    delete: async (req, res) => {
        try {
            await Supplier.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/suppliers');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Show items by supplier
    supplierItems: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id, {
                include: [{
                    model: Item,
                    as: 'items'
                }]
            });
            res.render('suppliers/items', { supplier });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    }
};