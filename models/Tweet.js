const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tweet = sequelize.define('Tweet', {
    id_tweet: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mensagem: {
        type: DataTypes.STRING(280),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(255),
        allowNull: true // Pode ser nulo, pois nem todos os tweets têm imagem
    },
    autor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    num_likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    num_repub: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Insere a data e hora atuais automaticamente
    },
    fk_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tweets',
    timestamps: false
});

module.exports = Tweet;