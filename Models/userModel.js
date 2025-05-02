const { DataTypes } = require('sequelize');

const sequelize = require('../Config/config')

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    loginUser: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false }
}, { timestamps: false });

module.exports = User