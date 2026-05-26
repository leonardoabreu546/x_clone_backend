const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
    id_comentario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mensagem: {
        type: DataTypes.STRING(280),
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Insere a data e hora atuais automaticamente
    },
    fk_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fk_tweet: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'comentarios',
    timestamps: false
});

module.exports = Comment;