const express = require('express');
const mongoose = require('mongoose');
const productosRouter = require('./routes/productos'); // Asegúrate de importar correctamente

const app = express();
app.use(express.json()); // Para poder recibir JSON en el body
app.use('/api', productosRouter); // Asegúrate de que las rutas estén montadas correctamente

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/dummycorp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

// Levantar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
