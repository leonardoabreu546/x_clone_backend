const { Tweet, User } = require('../models');

const tweetController = {
    // ==========================================
    // FUNÇÃO PARA PUBLICAR UM TWEET
    // ==========================================
    async create(req, res) {
        try {
            const { mensagem, imagem } = req.body;
            
            // O nosso middleware de autenticação guarda o ID aqui:
            const userId = req.user.userId;

            // Vamos buscar o utilizador à base de dados para saber o username dele
            const user = await User.findByPk(userId);

            // Criar o tweet
            const novoTweet = await Tweet.create({
                mensagem: mensagem,
                imagem: imagem || null,
                autor: user.username,
                fk_utilizador: userId
            });

            return res.status(201).json({
                message: 'Tweet publicado com sucesso!',
                tweet: novoTweet
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao publicar o tweet.' });
        }
    },

    // ==========================================
    // FUNÇÃO PARA VER O FEED (LÊ TODOS OS TWEETS)
    // ==========================================
    async getFeed(req, res) {
        try {
            // Ir à base de dados buscar todos os tweets
            const tweets = await Tweet.findAll({
                order: [['data_criacao', 'DESC']] // Ordenar do mais recente para o mais antigo
            });

            return res.status(200).json(tweets);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao carregar o feed de tweets.' });
        }
    }
};

module.exports = tweetController;