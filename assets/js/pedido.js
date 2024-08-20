// Inicialización de la clase Carrito
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos() {
    // Agregar producto al carrito
    productos.addEventListener('click', (e) => carro.comprarProducto(e));
    
    // Eliminar producto del carrito
    carrito.addEventListener('click', (e) => carro.eliminarProducto(e));
    
    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', (e) => carro.vaciarCarrito(e));
    
    // Leer productos del local storage al cargar la página
    document.addEventListener('DOMContentLoaded', () => carro.leerLocalStorage());
    
    // Procesar el pedido
    procesarPedidoBtn.addEventListener('click', (e) => carro.procesarPedido(e));
}
