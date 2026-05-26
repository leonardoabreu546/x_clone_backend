const sequelize = require('../config/database');

// Importar os modelos
const User = require('./User');
const Tweet = require('./Tweet');
const Comment = require('./Comment');
const Follower = require('./Follower');
const Like = require('./Like');

// ==========================================
// DEFINIÇÃO DAS RELAÇÕES (ASSOCIAÇÕES)
// ==========================================

// Utilizadores e Tweets (Um-para-Muitos)
User.hasMany(Tweet, { foreignKey: 'fk_utilizador', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tweet.belongsTo(User, { foreignKey: 'fk_utilizador' });

// Utilizadores e Comentários (Um-para-Muitos)
User.hasMany(Comment, { foreignKey: 'fk_utilizador', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'fk_utilizador' });

// Tweets e Comentários (Um-para-Muitos)
Tweet.hasMany(Comment, { foreignKey: 'fk_tweet', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(Tweet, { foreignKey: 'fk_tweet' });

// Seguidores (Muitos-para-Muitos usando a tabela Follower)
User.belongsToMany(User, { as: 'Seguidores', through: Follower, foreignKey: 'fk_seguido', otherKey: 'fk_seguidor', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
User.belongsToMany(User, { as: 'Seguindo', through: Follower, foreignKey: 'fk_seguidor', otherKey: 'fk_seguido', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Likes (Muitos-para-Muitos usando a tabela Like)
User.belongsToMany(Tweet, { through: Like, foreignKey: 'fk_utilizador', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tweet.belongsToMany(User, { through: Like, foreignKey: 'fk_tweet', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Exportar tudo empacotado
module.exports = {
    sequelize,
    User,
    Tweet,
    Comment,
    Follower,
    Like
};