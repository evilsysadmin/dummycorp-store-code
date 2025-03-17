const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productosRouter = require('../routes/productos');  // Asegúrate de importar las rutas

const app = express();
const port = 3000;

// Conectar con MongoDB
mongoose.connect('mongodb://mongo:27017/dummycorp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión a MongoDB:', err));

// Usar CORS
app.use(cors());

// Usar el body-parser para manejar datos JSON
app.use(express.json());

// Registrar la ruta de productos
app.use('/api', productosRouter);  // Asegúrate de que esta línea esté registrada

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
