const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follower = sequelize.define('Follower', {
    fk_seguidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    fk_seguido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'seguidores',
    timestamps: false
});

module.exports = Follower;