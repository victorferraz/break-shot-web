const fs        = require('fs');
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const sequelizeConn = new Sequelize(config.database, config.username, config.password, config);
const db        = {};

let Printscreen = sequelize.define('User', {
    ip: DataTypes.STRING,
    url: DataTypes.STRING,
    file: DataTypes.STRING,
    sizeType: DataTypes.STRING,
    email: DataTypes.SRING,
    extension: DataTypes.STRING,
    size: DataTypes.STRING,
    origin: DataTypes.STRING
});

let Size = squelize.define('Size', {
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER
});

Printscreen.hasMany(Size);
