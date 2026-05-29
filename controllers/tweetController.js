const { Tweet, User, Like, Follower } = require('../models');

const tweetController = {
    // ==========================================
    // FUNÇÃO PARA PUBLICAR UM TWEET (COM IMAGEM)
    // ==========================================
    async create(req, res) {
        try {
            // A imagem agora não vem no req.body, vem no req.file através do multer
            const { mensagem } = req.body;
            
            // Lógica do Multer para guardar o caminho da imagem
            let imagemCaminho = null;
            if (req.file) {
                imagemCaminho = '/uploads/' + req.file.filename;
            }
            
            // O nosso middleware de autenticação guarda o ID aqui:
            const userId = req.user.userId;

            // Buscar o utilizador à base de dados para saber o username dele
            const user = await User.findByPk(userId);

            // Criar o tweet
            const novoTweet = await Tweet.create({
                mensagem: mensagem,
                imagem: imagemCaminho, // Guardamos o caminho gerado pelo Multer
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
    // FUNÇÃO PARA VER O FEED GLOBAL (EXPLORAR)
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
    // FUNÇÃO PARA VER O FEED PESSOAL (SÓ CONTAS SEGUIDAS)
    // ==========================================
    async getFollowingFeed(req, res) {
        try {
            const userId = req.user.userId;

            // Procurar os IDs de todos os utilizadores que tu segues
            const pessoasQueSigo = await Follower.findAll({
                where: { fk_seguidor: userId }
            });

            // Extrair apenas os IDs para uma lista simples (ex: [2, 5, 12])
            const listaIds = pessoasQueSigo.map(seguido => seguido.fk_seguido);

            // Ir à base de dados buscar APENAS os tweets dessas pessoas
            const tweets = await Tweet.findAll({
                where: { fk_utilizador: listaIds },
                order: [['data_criacao', 'DESC']] // Do mais recente para o mais antigo
            });

            return res.status(200).json(tweets);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao carregar o feed pessoal.' });
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