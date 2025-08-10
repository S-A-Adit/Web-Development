require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const sequelize = require('./config/database');
const path = require('path');

const app = express();

// Database connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and synced');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

// View engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/categories', require('./routes/categoryRoute'));
app.use('/items', require('./routes/itemRoutes'));
app.use('/suppliers', require('./routes/supplierRoutes'));

// Error handling
app.use((req, res, next) => {
  res.status(404).render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
