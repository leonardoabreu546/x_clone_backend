const bcrypt = require('bcryptjs');
const { User } = require('../models');

const authController = {
    // ==========================================
    // FUNÇÃO DE REGISTO (SIGNUP)
    // ==========================================
    async signup(req, res) {
        try {
            // Receber os dados que vêm do front-end
            const { username, email, password } = req.body;

            // Encriptar a password para não ficar visível na base de dados
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Guardar o novo utilizador na base de dados
            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword
            });

            return res.status(201).json({
                message: 'Utilizador registado com sucesso!',
                user: {
                    id: newUser.id_utilizador,
                    username: newUser.username,
                    email: newUser.email
                }
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro interno ao registar o utilizador.' });
        }
    }
};

module.exports = authController;