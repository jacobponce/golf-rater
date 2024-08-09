const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('postgres://me:ilovegolf@localhost:5432/api')

sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel')(sequelize, DataTypes)

module.exports = db

