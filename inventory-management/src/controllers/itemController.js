const pool = require("../config/db");

// List all items
exports.item_list = async (req, res) => {
  const { rows } = await pool.query(
    `SELECT item.*, category.name AS category_name
     FROM item
     JOIN category ON item.category_id = category.id
     ORDER BY item.name ASC`
  );
  const item = rows[0]; 
  res.render("items/list", { 
    title: item ? item.name : "Item List",
    items: rows 
  });
}


// View single item
exports.item_detail = async (req, res) => {
  const itemId = req.params.id;

  const item = await pool.query(
    `SELECT item.*, category.name AS category_name
     FROM item
     JOIN category ON item.category_id = category.id
     WHERE item.id = $1`,
    [itemId]
  );

  if (item.rows.length === 0) {
    return res.status(404).send("Item not found");
  }

  res.render("items/detail", { 
  title: item.rows[0].name, 
  item: item.rows[0] 
  });

};

// Create (GET)
exports.item_create_get = async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM category');
    
    res.render('items/form', {
      title: 'Create Item',
      item: null, // Explicitly set to null
      categories: categories.rows // Make sure to pass categories
    });
  } catch (err) {
    console.error('Error:', err);
    req.flash('error', 'Error loading form');
    res.redirect('/items');
  }
};

// Create (POST)
exports.item_create_post = async (req, res) => {
  const { name, description, price, quantity, category_id } = req.body;

  await pool.query(
    `INSERT INTO item (name, description, price, quantity, category_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, description, price, quantity, category_id]
  );

  res.redirect("/items");
};

// Update (GET)
exports.item_update_get = async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    if (isNaN(itemId)) {
      req.flash('error', 'Invalid ID');
      return res.redirect('/items');
    }

    const item = await pool.query('SELECT * FROM item WHERE id = $1', [itemId]);
    const categories = await pool.query('SELECT * FROM category');

    if (item.rows.length === 0) {
      req.flash('error', 'Item not found');
      return res.redirect('/items');
    }

    res.render('items/form', {
      title: 'Update Item',
      item: item.rows[0],
      categories: categories.rows
    });
  } catch (err) {
    console.error('Error:', err);
    req.flash('error', 'Error loading item');
    res.redirect('/items');
  }
};


// Update (POST)
exports.item_update_post = async (req, res) => {
  const { name, description, price, quantity, category_id } = req.body;
  const itemId = req.params.id;

  await pool.query(
    `UPDATE item
     SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5
     WHERE id = $6`,
    [name, description, price, quantity, category_id, itemId]
  );

  res.redirect(`/items/${itemId}`);
};

// Delete (GET)
exports.item_delete_get = async (req, res) => {
  const itemId = req.params.id;
  const item = await pool.query("SELECT * FROM item WHERE id = $1", [itemId]);

  if (item.rows.length === 0) {
    return res.status(404).send("Item not found");
  }

  res.render("items/delete", { 
  title: `Delete ${item.rows[0].name}`, // Now layout.ejs will get the title
  item: item.rows[0] 
  });
};

// Delete (POST)
exports.item_delete_post = async (req, res) => {
  const { admin_password } = req.body;
  if (admin_password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send("Invalid admin password");
  }

  const itemId = req.params.id;
  await pool.query("DELETE FROM item WHERE id = $1", [itemId]);
  res.redirect("/items");
};
