const { DataTypes } = require("sequelize");
module.exports = (sequelize) => sequelize.define("predmet",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is:/^[A-Z]+\d?$/
            }
        }
    });
