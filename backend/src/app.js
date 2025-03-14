const express = require('express');
const mongoose = require('mongoose');
const productosRouter = require('./routes/productos');

const app = express();

mongoose.connect('mongodb://mongo:27017/dummycorp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());
app.use('/api', productosRouter);

app.listen(3000, () => {
  console.log('Backend corriendo en el puerto 3000');
});
