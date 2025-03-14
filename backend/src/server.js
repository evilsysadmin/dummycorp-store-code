const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/dummycorp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error de conexión:', err));

// Middleware para analizar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
