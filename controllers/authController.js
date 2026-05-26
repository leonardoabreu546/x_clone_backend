const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Profile } = require('../models');

const authController = {
    // ==========================================
    // FUNÇÃO DE REGISTO (SIGNUP)
    // ==========================================
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Criar o utilizador
            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword
            });

            // Criar o perfil vazio automaticamente (Relação 1:1)
            await Profile.create({
                fk_utilizador: newUser.id_utilizador
            });

            return res.status(201).json({
                message: 'Utilizador registado com sucesso e Perfil criado!',
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
    },

    // ==========================================
    // FUNÇÃO DE LOGIN
    // ==========================================
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }

            // Gerar o Token JWT
            const token = jwt.sign(
                { userId: user.id_utilizador, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                message: 'Login efetuado com sucesso!',
                token: token,
                user: {
                    id: user.id_utilizador,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ error: 'Erro interno ao efetuar login.' });
        }
    }
};

module.exports = authController;