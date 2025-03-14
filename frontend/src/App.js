import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem('carrito');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [verCarrito, setVerCarrito] = useState(false);
  const [mensajePopup, setMensajePopup] = useState('');

  useEffect(() => {
    setProductos([
      {
        id: 1,
        nombre: 'LART de BOFH',
        descripcion: 'Ideal para dar por saco al sistema. Solo para administradores con sentido del humor.',
        precio: 9.99,
        imagen: '/lart-image.jpg',
      },
      {
        id: 2,
        nombre: 'Polos de segunda mano',
        descripcion: 'Ligeramente usados, pero con una historia increíble. La mejor inversión si quieres tener estilo y misterio.',
        precio: 3999.00,
        imagen: '/vw-polo-image.jpg',
      },
      {
        id: 3,
        nombre: 'Gepeto (IA)',
        descripcion: 'IA humorística que te hace chistes malos a cambio de tu dignidad.',
        precio: 19900.99,
        imagen: '/gepeto-image.jpg',
      },
      {
        id: 4,
        nombre: 'Manual de Excusas para Desarrolladores',
        descripcion: 'Contiene 101 formas de decir "En mi máquina funciona". Bestseller entre programadores. MUHAHA.',
        precio: 15.99,
        imagen: '/dev-excuses.jpg',
      },
    ]);
  }, []);

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

    // Mostrar el popup de producto añadido
    setMensajePopup(`¡${producto.nombre} añadido al carrito!`);
    setTimeout(() => setMensajePopup(''), 3000);  // Eliminar mensaje después de 3 segundos
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
    setCarrito([]); // Vaciamos el carrito en el estado
    localStorage.removeItem('carrito'); // Eliminamos el carrito del localStorage
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
        <div>
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

      {/* Mostrar mensaje pop-up */}
      {mensajePopup && <div className="popup">{mensajePopup}</div>}

      {verCarrito && (
        <div className="carrito-modal">
          <h2>Tu Carrito</h2>
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
      )}

      <div className="productos">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={producto.nombre} />
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p><strong>Precio: €{producto.precio.toFixed(2)}</strong></p>
            <button onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
