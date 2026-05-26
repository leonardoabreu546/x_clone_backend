const { Follower, User } = require('../models');

const followerController = {
    // ==========================================
    // FUNÇÃO PARA SEGUIR / DEIXAR DE SEGUIR
    // ==========================================
    async toggleFollow(req, res) {
        try {
            const seguidorId = req.user.userId; // Quem está a fazer o pedido (tu)
            const seguidoId = req.params.id;    // Quem queremos seguir (vem do endereço web)

            if (seguidorId == seguidoId) {
                return res.status(400).json({ error: 'Não podes seguir-te a ti próprio.' });
            }

            // Verificar se o utilizador que queremos seguir realmente existe
            const utilizadorAlvo = await User.findByPk(seguidoId);
            if (!utilizadorAlvo) {
                return res.status(404).json({ error: 'Utilizador não encontrado.' });
            }

            // Verificar se já segues esta pessoa
            const jaSegue = await Follower.findOne({
                where: { fk_seguidor: seguidorId, fk_seguido: seguidoId }
            });

            if (jaSegue) {
                // Se já segues, apaga o registo (Deixar de seguir)
                await jaSegue.destroy();
                return res.status(200).json({ message: 'Deixaste de seguir este utilizador.' });
            } else {
                // Se não segues, cria o registo (Começar a seguir)
                await Follower.create({ fk_seguidor: seguidorId, fk_seguido: seguidoId });
                return res.status(201).json({ message: 'Começaste a seguir este utilizador!' });
            }

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro ao tentar seguir o utilizador.' });
        }
    }
};

module.exports = followerController;