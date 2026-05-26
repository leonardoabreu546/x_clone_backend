var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const followerController = require('../controllers/followerController');
const authMiddleware = require('../middleware/auth');

// ==========================================
// ROTAS DE AUTENTICAÇÃO E UTILIZADORES
// ==========================================

// Rota de Registo
router.post('/signup', authController.signup);

// Rota de Login
router.post('/login', authController.login);

// ==========================================
// ROTAS DE INTERAÇÃO ENTRE UTILIZADORES
// ==========================================

// Rota para Seguir ou Deixar de Seguir (Protegida)
router.post('/:id/follow', authMiddleware, followerController.toggleFollow);

module.exports = router;