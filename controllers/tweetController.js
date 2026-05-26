const { Tweet, User, Like } = require('../models');

const tweetController = {
    // ==========================================
    // FUNÇÃO PARA PUBLICAR UM TWEET
    // ==========================================
    async create(req, res) {
        try {
            const { mensagem, imagem } = req.body;
            
            // O nosso middleware de autenticação guarda o ID aqui:
            const userId = req.user.userId;

            //Buscar o utilizador à base de dados para saber o username dele
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
    // FUNÇÃO PARA VER O FEED
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
    },

    // ==========================================
    // FUNÇÃO PARA DAR/TIRAR LIKE
    // ==========================================
    async toggleLike(req, res) {
        try {
            // O ID do tweet vem no endereço de internet (ex: /tweets/5/like)
            const tweetId = req.params.id;
            const userId = req.user.userId;

            // Verificar se o tweet existe
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                return res.status(404).json({ error: 'Tweet não encontrado.' });
            }

            // Verificar se este utilizador já deu like neste tweet
            const likeExiste = await Like.findOne({
                where: { fk_utilizador: userId, fk_tweet: tweetId }
            });

            if (likeExiste) {
                // Se já deu like, removemos da tabela e diminuímos o contador
                await likeExiste.destroy();
                await tweet.decrement('num_likes');
                return res.status(200).json({ message: 'Like removido.' });
            } else {
                // Se não deu like, guardamos na tabela e aumentamos o contador
                await Like.create({ fk_utilizador: userId, fk_tweet: tweetId });
                await tweet.increment('num_likes');
                return res.status(201).json({ message: 'Like adicionado!' });
            }

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao processar o like.' });
        }
    }
};

module.exports = tweetController;