const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productosRouter = require('../routes/productos'); // Importa las rutas

const app = express();
const port = 3000;

// Obtener la URI de MongoDB desde las variables de entorno
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/dummycorp';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Conectado a MongoDB en ${mongoUri}`))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Usar CORS
app.use(cors());

// Usar el body-parser para manejar datos JSON
app.use(express.json());

// Registrar la ruta de productos
app.use('/api', productosRouter);

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
