const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/db_connection")

const student = sequelize.define(
    'payment',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }
)


module.exports = payment