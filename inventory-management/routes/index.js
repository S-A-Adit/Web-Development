const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Ensure correct path

// Home page route
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('index', { 
      title: 'Inventory Management System', // Add this
      categories: [] // Make sure this exists if used in template
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = router;