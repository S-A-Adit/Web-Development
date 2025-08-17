require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');


// Import routes
const categoryRoutes = require('./src/routes/categoryRoutes');
const itemRoutes = require('./src/routes/itemRoutes');

// Port from .env or default
const PORT = process.env.PORT || 3000;
// Session configuration (required for flash messages)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Flash messages middleware
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
  const success_msg = req.flash('success_msg');
  const error_msg = req.flash('error_msg');
  
  res.locals.message = {
    text: success_msg || error_msg,
    type: success_msg ? 'success' : 'danger'
  };
  next();
});

// After creating your Express app
app.use(expressLayouts);



// Middleware setup
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json data

// Method Override for PUT/DELETE with HTML forms
app.use(methodOverride('_method'));

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', './layouts/layout'); // Default layout
app.set('view cache', false);
// Routes
app.get('/', (req, res) => {
  res.redirect('/categories'); // home redirect
});

app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
