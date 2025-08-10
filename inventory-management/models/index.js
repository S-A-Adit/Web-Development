const Category = require('./Category');
const Item = require('./Item');
const Supplier = require('./Supplier');

// Category-Item relationship (One-to-Many)
Category.hasMany(Item, { foreignKey: 'category_id' });
Item.belongsTo(Category, { foreignKey: 'category_id' });

// Item-Supplier relationship (Many-to-Many through ItemSupplier)
Item.belongsToMany(Supplier, { through: 'ItemSupplier' });
Supplier.belongsToMany(Item, { through: 'ItemSupplier' });

module.exports = {
  Category,
  Item,
  Supplier
};