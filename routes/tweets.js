var express = require('express');
var router = express.Router();
const tweetController = require('../controllers/tweetController');
const commentController = require('../controllers/commentController'); 
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload'); // <-- Nova importação do Multer

// ==========================================
// ROTAS DE TWEETS E FEEDS
// ==========================================

// Rota para Ver o Feed Global (Para o separador "Explorar" / "Todos")
router.get('/', tweetController.getFeed);

// Rota para Ver o Feed Pessoal (Para o teu separador "A Seguir" - Protegida)
router.get('/feed', authMiddleware, tweetController.getFollowingFeed);

// Rota para Publicar Tweet (Agora interceptada pelo multer)
router.post('/', authMiddleware, upload.single('imagem'), tweetController.create);

// Rota para Dar ou Tirar Like 
router.post('/:id/like', authMiddleware, tweetController.toggleLike);

// ==========================================
// ROTAS DE COMENTÁRIOS
// ==========================================

// Rota para Comentar num Tweet 
router.post('/:id/comments', authMiddleware, commentController.create);

module.exports = router;s