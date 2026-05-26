var express = require('express');
var router = express.Router();
const tweetController = require('../controllers/tweetController');
const commentController = require('../controllers/commentController'); // <-- Nova importação
const authMiddleware = require('../middleware/auth');

// ==========================================
// ROTAS DE TWEETS
// ==========================================

// Rota para Ver o Feed 
router.get('/', tweetController.getFeed);

// Rota para Publicar Tweet 
router.post('/', authMiddleware, tweetController.create);

// Rota para Dar ou Tirar Like 
router.post('/:id/like', authMiddleware, tweetController.toggleLike);

// ==========================================
// ROTAS DE COMENTÁRIOS
// ==========================================

// Rota para Comentar num Tweet 
router.post('/:id/comments', authMiddleware, commentController.create);

module.exports = router;