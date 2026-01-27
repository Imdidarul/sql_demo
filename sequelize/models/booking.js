const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require("../utils/db_connection")

const student = sequelize.define(
    'bookings',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        busNumber:{
            type: DataTypes.STRING,
            allowNull: false
        },
        seatNumber:{
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }
)


module.exports = bookings