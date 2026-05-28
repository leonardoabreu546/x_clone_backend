const adminAuth = (req, res, next) => {   
    // Vamos apenas verificar se a propriedade isAdmin é verdadeira
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Acesso negado. Funcionalidade exclusiva para Administradores.' });
    }

    next();
};

module.exports = adminAuth;