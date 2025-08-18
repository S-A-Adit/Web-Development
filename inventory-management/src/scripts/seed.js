const pool = require("../config/db");

async function seed() {
  try {
    // Clear existing data
    await pool.query("DELETE FROM item");
    await pool.query("DELETE FROM category");

    // Seed categories
    const categories = [
      {name: "Uncategorized", description: "Default category for reassigned items" },
      { name: "Electronics", description: "Devices and gadgets" },
      { name: "Clothing", description: "Apparel and accessories" },
      { name: "Books", description: "Fiction and non-fiction" },
      { name: "Home & Garden", description: "Furniture and decor" },
      { name: "Sports", description: "Equipment and gear" }
    ];

    const categoryIds = {};

  for (let i = 0; i < categories.length; i++) {
  const category = categories[i];

  // Insert category into DB
  const res = await pool.query(
    "INSERT INTO category (name, description) VALUES ($1, $2) RETURNING id",
    [category.name, category.description]
  );

  // Map category name → id
  categoryIds[category.name] = res.rows[0].id;

  const defaultCategoryRes = await pool.query(
  "SELECT id FROM category WHERE name = $1",
  ["Uncategorized"]
  );
   const DEFAULT_CATEGORY_ID = defaultCategoryRes.rows[0].id;
}

    // Seed items
    const items = [
      // Electronics
      { 
        name: "Laptop", 
        description: "15-inch display, 16GB RAM, 512GB SSD", 
        price: 1200.00, 
        quantity: 5, 
        category_id: categoryIds["Electronics"] 
      },
      { 
        name: "Smartphone", 
        description: "6.5-inch OLED, 128GB storage", 
        price: 799.99, 
        quantity: 10, 
        category_id: categoryIds["Electronics"] 
      },
      { 
        name: "Headphones", 
        description: "Noise-cancelling wireless", 
        price: 249.99, 
        quantity: 15, 
        category_id: categoryIds["Electronics"] 
      },

      // Clothing
      { 
        name: "T-Shirt", 
        description: "Cotton, medium size", 
        price: 19.99, 
        quantity: 50, 
        category_id: categoryIds["Clothing"] 
      },
      { 
        name: "Jeans", 
        description: "Slim fit, dark blue", 
        price: 59.99, 
        quantity: 30, 
        category_id: categoryIds["Clothing"] 
      },

      // Books
      { 
        name: "JavaScript: The Good Parts", 
        description: "By Douglas Crockford", 
        price: 29.99, 
        quantity: 8, 
        category_id: categoryIds["Books"] 
      },
      { 
        name: "Clean Code", 
        description: "By Robert C. Martin", 
        price: 34.99, 
        quantity: 12, 
        category_id: categoryIds["Books"] 
      },

      // Home & Garden
      { 
        name: "Coffee Table", 
        description: "Modern design, oak wood", 
        price: 199.99, 
        quantity: 3, 
        category_id: categoryIds["Home & Garden"] 
      },
      { 
        name: "Indoor Plant", 
        description: "Low maintenance", 
        price: 24.99, 
        quantity: 20, 
        category_id: categoryIds["Home & Garden"] 
      },

      // Sports
      { 
        name: "Yoga Mat", 
        description: "Non-slip surface", 
        price: 29.99, 
        quantity: 15, 
        category_id: categoryIds["Sports"] 
      },
      { 
        name: "Dumbbell Set", 
        description: "Adjustable weights", 
        price: 89.99, 
        quantity: 7, 
        category_id: categoryIds["Sports"] 
      }
    ];

    for (const item of items) {
      await pool.query(
        "INSERT INTO item (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5)",
        [item.name, item.description, item.price, item.quantity, item.category_id]
      );
    }

    console.log("✅ Database seeded successfully with test data!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    pool.end();
  }
}

seed();