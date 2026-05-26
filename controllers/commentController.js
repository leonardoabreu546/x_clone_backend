const { Comment, Tweet } = require('../models');

const commentController = {
    // ==========================================
    // FUNÇÃO PARA COMENTAR UM TWEET
    // ==========================================
    async create(req, res) {
        try {
            // O ID do tweet vem do endereço (ex: /tweets/5/comments)
            const tweetId = req.params.id;
            const userId = req.user.userId;
            const { mensagem } = req.body;

            // Verificar se o tweet onde queremos comentar realmente existe
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                return res.status(404).json({ error: 'Tweet não encontrado.' });
            }

            // Criar o comentário
            const novoComentario = await Comment.create({
                mensagem: mensagem,
                fk_utilizador: userId,
                fk_tweet: tweetId
            });

            return res.status(201).json({
                message: 'Comentário publicado com sucesso!',
                comment: novoComentario
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao publicar o comentário.' });
        }
    }
};

module.exports = commentController;