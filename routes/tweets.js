var express = require('express');
var router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/auth');

// Rota para Ver o Feed (Qualquer pessoa pode ver)
router.get('/', tweetController.getFeed);

// Rota para Publicar Tweet (Protegida)
router.post('/', authMiddleware, tweetController.create);

module.exports = router;