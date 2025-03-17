const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema({
  usuarioId: {
    type: String,
    required: true
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ]
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;
