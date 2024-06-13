const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const cors = require('cors');

// Permitir todas las solicitudes CORS para evitar errores con el navegador
router.use(cors());

router.get('/fetch', movieController.getMovies);
router.get('/', movieController.getAllMovies);

module.exports = router;