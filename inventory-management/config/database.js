const { Sequelize } = require('sequelize'); // Add this line
const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false
});

// Auto-create database if it doesn't exist
(async () => {
  try {
    await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created`);
  } catch (err) {
    if (err.original.code !== '42P04') { // Ignore "database already exists" error
      console.error('Database creation error:', err);
    }
  }
})();

// Then reconnect to the new database
const appSequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

module.exports = appSequelize;