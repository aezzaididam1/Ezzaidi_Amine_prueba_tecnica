const db = require('../config/dbConfig'); // Importa la configuración de la base de datos

const Movie = {
  getAllMovies: (callback) => { //Metodo para obtener todos los registros de la tabla movies
    const query = 'SELECT * FROM movies';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  insertMovie: (movie, callback) => { // Metodo para insertar registros en la tabla movies 
    const { imdbID, title, year, plot, rating } = movie;
    const query = 'INSERT INTO movies (imdbID, title, year, plot, rating) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [imdbID, title, year, plot,rating], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  updateMovieRating: (imdbID, rating, callback) => {
    const query = 'UPDATE movies SET rating = ? WHERE imdbID = ?';
    db.query(query, [rating, imdbID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};


module.exports = Movie; // Se exoprta para poder usarse en otros sitios
