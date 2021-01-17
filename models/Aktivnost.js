const { DataTypes } = require("sequelize");
module.exports = (sequelize) => sequelize.define("aktivnost",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: DataTypes.STRING
        },
        pocetak: {
            type: DataTypes.FLOAT
        },
        kraj: {
            type: DataTypes.FLOAT
        }
    });
