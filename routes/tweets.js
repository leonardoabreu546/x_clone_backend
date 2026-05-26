var express = require('express');
var router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/auth');

// Rota para Publicar Tweet (Protegida)
router.post('/', authMiddleware, tweetController.create);

module.exports = router;