const { User, Tweet } = require('../models');

const adminController = {
    // ==========================================
    // BACKOFFICE: GESTÃO DE UTILIZADORES
    // ==========================================
    
    // Atualizar Utilizador (EDITAR)
    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const { username, email } = req.body;
            
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilizador não encontrado.' });
            }

            // Atualiza os dados
            await user.update({ username, email });
            return res.status(200).json({ message: 'Utilizador atualizado com sucesso.', user });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao atualizar utilizador.' });
        }
    },

    // Eliminar Utilizador (EXCLUIR)
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            
            if (!user) {
                return res.status(404).json({ error: 'Utilizador não encontrado.' });
            }
            
            // O CASCADE na base de dados vai apagar os tweets, likes e comentários do utilizador automaticamente!
            await user.destroy();
            return res.status(200).json({ message: 'Utilizador eliminado com sucesso.' });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao eliminar utilizador.' });
        }
    },

    // ==========================================
    // BACKOFFICE: GESTÃO DE TWEETS
    // ==========================================
    
    // Atualizar Tweet (EDITAR)
    async updateTweet(req, res) {
        try {
            const tweetId = req.params.id;
            const { mensagem } = req.body;
            
            const tweet = await Tweet.findByPk(tweetId);
            if (!tweet) {
                return res.status(404).json({ error: 'Tweet não encontrado.' });
            }

            await tweet.update({ mensagem });
            return res.status(200).json({ message: 'Tweet atualizado com sucesso.', tweet });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao atualizar tweet.' });
        }
    },

    // Eliminar Tweet (EXCLUIR)
    async deleteTweet(req, res) {
        try {
            const tweetId = req.params.id;
            const tweet = await Tweet.findByPk(tweetId);
            
            if (!tweet) {
                return res.status(404).json({ error: 'Tweet não encontrado.' });
            }
            
            await tweet.destroy();
            return res.status(200).json({ message: 'Tweet eliminado com sucesso.' });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao eliminar tweet.' });
        }
    }
};

module.exports = adminController;