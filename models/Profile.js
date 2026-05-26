const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bio: {
        type: DataTypes.STRING(160),
        allowNull: true
    },
    localizacao: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fk_utilizador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true //Força a relação 1:1 no MySQL
    }
}, {
    tableName: 'perfis',
    timestamps: false
});

module.exports = Profile;