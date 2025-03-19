const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: false } // Opcional, ya que no lo usas en POST
}, { collection: 'products' }); // Forzar colección 'products'

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;