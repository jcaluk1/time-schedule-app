const Sequelize = require("sequelize");
const config = require("./configDb");
const mysql = require("mysql2/promise");

const sequelize = new Sequelize(config.database, config.password, config.username,
    {
        host: config.host,
        port: config.post,
        dialect: config.dialect,
        define: {
            timestamps: false,
            freezeTableName: true
        },
        logging: false
    });

const Dan = require("./models/Dan")(sequelize);
const Predmet = require("./models/Predmet")(sequelize);
const Tip = require("./models/Tip")(sequelize);
const Grupa = require("./models/Grupa")(sequelize);
const Aktivnost = require("./models/Aktivnost")(sequelize);
const Student = require("./models/Student")(sequelize);

Predmet.hasMany(Grupa, {
    foreginKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});
Grupa.belongsTo(Predmet);

Tip.hasMany(Aktivnost, {
    foreginKey: {
        allowNull: false
    }
});
Dan.hasMany(Aktivnost, {
    foreginKey: {
        allowNull: false
    }
});
Predmet.hasMany(Aktivnost, {
    foreginKey: {
        allowNull: false
    }
});
Grupa.hasMany(Aktivnost);
Aktivnost.belongsTo(Tip);
Aktivnost.belongsTo(Dan);
Aktivnost.belongsTo(Predmet);
Aktivnost.belongsTo(Grupa);

const Sg = Student.belongsToMany(Grupa, { through: "sg" });
Grupa.belongsToMany(Student, { through: "sg" });

module.exports = { sequelize, Dan, Predmet, Tip, Grupa, Student, Aktivnost, Sg, init };

async function init () {
    const connection = await mysql.createConnection({ host: "localhost", port: "3306", user: "root", password: "root" });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
    sequelize.sync({ force: true });
    console.log("Tables created ...");
};
