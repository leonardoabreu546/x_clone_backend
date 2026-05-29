var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// ==========================================
// SEGURANÇA MÁXIMA PARA O BACKOFFICE
// ==========================================
// Todas as rotas abaixo exigem estar logado (authMiddleware) E ser Admin (adminAuth)
router.use(authMiddleware, adminAuth);

// ==========================================
// BACKOFFICE: GESTÃO DE UTILIZADORES
// ==========================================

// Rota para Editar Utilizador
router.put('/users/:id', adminController.updateUser);

// Rota para Eliminar Utilizador
router.delete('/users/:id', adminController.deleteUser);

// ==========================================
// BACKOFFICE: GESTÃO DE TWEETS
// ==========================================

// Rota para Editar Tweet
router.put('/tweets/:id', adminController.updateTweet);

// Rota para Eliminar Tweet
router.delete('/tweets/:id', adminController.deleteTweet);

module.exports = router;