const express = require('express');
const Producto = require('../models/producto');

const router = express.Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos' });
    }
    res.json(productos);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al obtener productos');
  }
});

// Crear un nuevo producto
router.post('/productos', async (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;

  // Validar que los campos sean proporcionados
  if (!nombre || !descripcion || !precio || !imagen) {
    return res.status(400).json({ message: 'Faltan datos obligatorios: nombre, descripcion, precio o imagen' });
  }

  try {
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      imagen,  // Asumiendo que el campo imagen es el nombre del archivo de imagen (como "lart-image.jpg")
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    console.error('Error al crear el producto:', err);
    res.status(500).send('Error al crear el producto');
  }
});

// Eliminar un producto
router.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
});


module.exports = router;
