const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
    fk_utilizador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    fk_tweet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'registo_likes',
    timestamps: false
});

module.exports = Like;