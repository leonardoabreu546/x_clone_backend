var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

// Rota de Registo
router.post('/signup', authController.signup);

// Rota de Login
router.post('/login', authController.login);

module.exports = router;