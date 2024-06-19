const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const cors = require('cors');

// Permitir todas las solicitudes CORS para evitar errores con el navegador
router.use(cors());

// endpoint para obtener películas desde OMDb y guardarlas en la base de datos
router.get('/fetch', movieController.getMovies);

// endpoint para obtener todas las películas desde la base de datos
router.get('/', movieController.getAllMovies);

// endpoint para actualizar el rating de una película específica
router.put('/:imdbID/rating/:ratingValue', movieController.updateMovieRating);

module.exports = router;
