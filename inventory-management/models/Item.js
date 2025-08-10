const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Item = sequelize.define('Item',{
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }

});
module.exports = Item;