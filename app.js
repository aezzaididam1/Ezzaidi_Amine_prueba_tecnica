const express = require('express'); // importado modulo express
const app = express(); // se crea una instancia de la aplicación para configurar las rutas
const movieRoutes = require('./routes/movieRoutes'); // especifica la ubicación de las rutas

app.use(express.json()); // analiza las entradas en formato JSON

app.use('/api/movies', movieRoutes);

const PORT = 3000;
app.listen(PORT, () => { // escucha en el puerto 3000
  console.log(`Server is running on port ${PORT}`);
});
