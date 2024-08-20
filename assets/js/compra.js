// Inicialización de la clase Carrito
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

// Elementos de la página de compra
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const cargandoGif = document.querySelector('#cargando');
const loaders = document.querySelector('#loaders');

// Cargar eventos
cargarEventos();

function cargarEventos() {
    // Agregar producto al carrito
    productos.addEventListener('click', (e) => carro.comprarProducto(e));

    // Eliminar producto del carrito
    carrito.addEventListener('click', (e) => carro.eliminarProducto(e));

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', (e) => carro.vaciarCarrito(e));

    // Leer productos del local storage al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        carro.leerLocalStorage();
        carro.calcularTotal();
    });

    // Procesar el pedido
    procesarPedidoBtn.addEventListener('click', (e) => procesarPedido(e));

    // Procesar compra desde la página de compra
    procesarCompraBtn.addEventListener('click', (e) => procesarCompra(e));
}

function procesarPedido(e) {
    e.preventDefault();
    if (carro.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        }).then(() => {
            window.location = "productos.html";
        });
    } else {
        location.href = "carrito.html";
    }
}

function procesarCompra(e) {
    e.preventDefault();
    if (carro.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        }).then(() => {
            window.location = "productos.html";
        });
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
        });
    } else {
        emailjs.init('user_hx2rYaxbexZ0qlT8bs771');

        document.getElementById('procesar-pago').addEventListener('submit', function (event) {
            event.preventDefault();

            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'assets/img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            const serviceID = 'default_service';
            const templateID = 'template_rtfpoq5';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    cargandoGif.style.display = 'none';
                    loaders.appendChild(enviado);
                    setTimeout(() => {
                        enviado.remove();
                        carro.vaciarLocalStorage();
                        window.location = "productos.html";
                    }, 2500);
                }, (err) => {
                    procesarCompraBtn.value = 'Send Email';
                    alert(JSON.stringify(err));
                });
        });
    }
}
