var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

/*Registo*/
router.post('/signup', authController.signup);

module.exports = router;
