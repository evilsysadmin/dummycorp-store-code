const express = require('express');
const Producto = require('../models/producto');

const router = express.Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).send('Error al obtener productos');
  }
});

module.exports = router;
