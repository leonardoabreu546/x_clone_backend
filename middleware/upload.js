const multer = require('multer');
const path = require('path');

// ==========================================
// CONFIGURAÇÃO DE ARMAZENAMENTO DO MULTER
// ==========================================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        // Criar um nome único: "tweetImage-16987654321.jpg"
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extensao = path.extname(file.originalname);
        
        cb(null, file.fieldname + '-' + uniqueSuffix + extensao);
    }
});

// ==========================================
// FILTRO DE SEGURANÇA (SÓ IMAGENS)
// ==========================================
const fileFilter = (req, file, cb) => {
    // Se o ficheiro for do tipo imagem, deixa passar
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // Se tentarem enviar PDFs, EXEs, etc., barra a entrada
        cb(new Error('Apenas ficheiros de imagem são permitidos!'), false);
    }
};

// Inicializar o Multer com as regras definidas e limite de 5MB
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    fileFilter: fileFilter
});

module.exports = upload;