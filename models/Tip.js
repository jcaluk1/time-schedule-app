const { DataTypes } = require("sequelize");
module.exports = (sequelize) => sequelize.define("tip",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
