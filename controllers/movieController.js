const axios = require('axios'); // importa "axios" para realizar solicitudes HTTP desde el navegador
const Movie = require('../models/movieModel'); //Importamos el modelo para hacer uso de el

const API_URL = 'http://www.omdbapi.com/';
const API_KEY = '731e41f';

const getMovies = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}?s=Star%20Wars&apikey=${API_KEY}`); //Mediante axios hace una peticion a la url indicada
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    const movies = response.data.Search.map(movie => ({
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      plot: 'N/A'
    }));

    for (const movie of movies) {
      try {
        await Movie.insertMovie(movie, (err, result) => {
          if (err) {
            console.error('Error al insertar movie:', err.message);
          }
        });
      } catch (err) {
        console.error('Error al insertar movie:', err.message);
      }
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error al obteener movies de OMDb API:', error.message);
    res.status(500).json({ error: `Error al obteener movies de OMDb API:: ${error.message}` });
  }
};

const getAllMovies = (req, res) => {
  Movie.getAllMovies((err, movies) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener movies de la base de datos' });
    } else {
      res.status(200).json(movies);
    }
  });
};

module.exports = { getMovies, getAllMovies };
