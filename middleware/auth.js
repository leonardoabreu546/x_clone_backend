const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Procurar o token no cabeçalho do pedido enviado pelo front-end
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Tem de fazer login primeiro.' });
    }

    try {
        // Limpar o prefixo "Bearer " (padrão de mercado) e validar a assinatura
        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

        // Se for válido, guardamos a informação de quem fez o pedido e deixamos passar
        req.user = decoded;
        next();
    } catch (erro) {
        return res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
    }
};

module.exports = authMiddleware;