const mongoose = require('mongoose');
const Producto = require('../models/producto'); // Este es el modelo que vamos a crear más abajo

mongoose.connect('mongodb://mongo:27017/dummycorp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida.');
    return Producto.deleteMany();  // Borramos los anteriores si hay
  })
  .then(() => {
    return Producto.insertMany([
      {
        nombre: 'LART de BOFH',
        descripcion: 'Ideal para dar por saco al sistema. Solo para administradores con sentido del humor.',
        precio: '€9.99',
      },
      {
        nombre: 'Polos de segunda mano',
        descripcion: 'Ligeramente usados, pero con una historia increíble. La mejor inversión si quieres tener estilo y misterio.',
        precio: '€4.99',
      },
      {
        nombre: 'Gepeto (IA)',
        descripcion: 'IA humorística que te hace chistes malos a cambio de tu dignidad.',
        precio: '€199.99',
      }
    ]);
  })
  .then(() => {
    console.log('Datos insertados con éxito');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error al insertar datos: ', err);
  });
