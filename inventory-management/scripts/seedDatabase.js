const { Category, Item, Supplier } = require('../models');

const seedDatabase = async () => {
  try {
    // Create sample categories
    const categories = await Category.bulkCreate([
      { name: 'Electronics', description: 'Electronic devices and components' },
      { name: 'Clothing', description: 'Apparel and accessories' },
      { name: 'Home Goods', description: 'Items for home and kitchen' }
    ]);

    // Create sample suppliers
    const suppliers = await Supplier.bulkCreate([
      { name: 'Tech Supply Co.', contact_email: 'sales@techsupply.com', phone: '555-1234' },
      { name: 'Fashion Distributors', contact_email: 'info@fashiondist.com', phone: '555-5678' }
    ]);

    // Create sample items
    const items = await Item.bulkCreate([
      { name: 'Laptop', description: '15-inch laptop with 16GB RAM', price: 999.99, quantity: 10, category_id: categories[0].id },
      { name: 'T-Shirt', description: 'Cotton crew neck t-shirt', price: 19.99, quantity: 50, category_id: categories[1].id }
    ]);

    // Set up supplier relationships
    await items[0].addSuppliers([suppliers[0]]);
    await items[1].addSuppliers([suppliers[1]]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();