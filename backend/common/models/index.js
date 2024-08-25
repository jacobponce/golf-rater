const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } = process.env;

// Use backticks for template literals
const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`);

sequelize.authenticate().then(() => {
    console.log(`Database connected to ${POSTGRES_DB}`);
}).catch((err) => {
    console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel')(sequelize, DataTypes);

module.exports = db;