import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [verCarrito, setVerCarrito] = useState(false);
  const [mensajePopup, setMensajePopup] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/productos') 
      .then((response) => {
        const productosConId = response.data.map((producto) => ({
          id: producto._id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: parseFloat(producto.precio),
          imagen: producto.imagen ? `/images/${producto.imagen}` : '/images/lart-image.jpg',
        }));
        setProductos(productosConId);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        const nuevoCarrito = [...prevCarrito, { ...producto, cantidad: 1 }];
        return nuevoCarrito;
      }
    });
    setMensajePopup(`¡${producto.nombre} añadido al carrito!`);
    setTimeout(() => setMensajePopup(''), 3000);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => {
      const productoAEliminar = prevCarrito.find(item => item.id === id);
      if (productoAEliminar.cantidad > 1) {
        return prevCarrito.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      } else {
        return prevCarrito.filter(item => item.id !== id);
      }
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const calcularCarrito = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };

  const mostrarCarrito = () => {
    return carrito.map((producto) => (
      <div key={producto.id} className="producto-carrito">
        <div className="producto-thumbnail">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="producto-info">
          <h3>{producto.nombre}</h3>
          <p>Cantidad: {producto.cantidad}</p>
          <p>€{(producto.precio * producto.cantidad).toFixed(2)}</p>
          <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <div className="App">
      <header className="header">
        <h1>Bienvenido a la tienda de frikadas</h1>
        <div className="carrito-header">
          <div className="carrito-boton">
            <img 
              src="/carrito-icon.png" 
              alt="Carrito" 
              onClick={() => setVerCarrito(!verCarrito)} 
              className="carrito-icon"
            />
            {calcularCarrito() > 0 && (
              <span className="badge">{calcularCarrito()}</span>
            )}
          </div>
          <span className="total-carrito">€{calcularTotal()}</span>
        </div>
      </header>
      {mensajePopup && <div className="popup">{mensajePopup}</div>}
      {verCarrito && (
        <>
          <div className="carrito-modal-overlay" onClick={() => setVerCarrito(false)}></div>
          <div className="carrito-modal">
            <h2>
              Tu Carrito
              <span style={{ cursor: 'pointer' }} onClick={() => setVerCarrito(false)}>✕</span>
            </h2>
            {carrito.length > 0 ? (
              <div className="productos-carrito">
                {mostrarCarrito()}
                <h3>Total: €{calcularTotal()}</h3>
                <button onClick={vaciarCarrito}>Vaciar Carrito</button>
              </div>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
            <button onClick={() => setVerCarrito(false)}>Cerrar</button>
          </div>
        </>
      )}
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} 
        />
      </div>
      <div className="productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p><strong>Precio: €{producto.precio.toFixed(2)}</strong></p>
              <button onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
            </div>
          ))
        ) : (
          <p>No se han encontrado productos.</p>
        )}
      </div>
    </div>
  );
}

export default App;