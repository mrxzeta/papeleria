class Carrito {
    // Añadir el producto al carrito
    comprarProducto(e) {
      e.preventDefault();
      if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement;
        this.leerDatosProducto(producto);
      }
    }
  
    leerDatosProducto(producto) {
      const cantidad = producto.querySelector('.cantidad').value;
      const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: parseInt(cantidad, 10) // Convierte la cantidad a entero
      };
  
      let productosLS = this.obtenerProductosLocalStorage();
      const productoExistente = productosLS.find(p => p.id === infoProducto.id);
  
      if (productoExistente) {
        productoExistente.cantidad += infoProducto.cantidad; // Incrementa la cantidad si ya existe
        productosLS = productosLS.map(p => p.id === infoProducto.id ? productoExistente : p);
        Swal.fire({
          icon: 'info',
          title: 'Cantidad actualizada',
          timer: 2500,
          showConfirmButton: false
        });
      } else {
        productosLS.push(infoProducto);
        Swal.fire({
          icon: 'success',
          title: 'Agregado',
          timer: 2500,
          showConfirmButton: false
        });
      }
  
      this.insertarCarrito(infoProducto);
      this.guardarProductosLocalStorage(productosLS);
    }
  
    insertarCarrito(producto) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${producto.imagen}" width=100></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td> = </td>
        <td>${producto.precio * producto.cantidad}</td>
        <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a></td>
      `;
      listaProductos.appendChild(row);
      this.guardarProductosLocalStorage(producto);
    }
  
    eliminarProducto(e) {
      e.preventDefault();
      if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        const productoID = e.target.getAttribute('data-id');
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
        Swal.fire({
          icon: 'info',
          title: 'Eliminado',
          timer: 2500,
          showConfirmButton: false
        });
      }
    }
  
    vaciarCarrito(e) {
      e.preventDefault();
      while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
      }
      this.vaciarLocalStorage();
      Swal.fire({
        icon: 'info',
        title: 'Carrito Vacío',
        timer: 2500,
        showConfirmButton: false
      });
      return false;
    }
  
    guardarProductosLocalStorage(productos) {
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  
    obtenerProductosLocalStorage() {
      return JSON.parse(localStorage.getItem('productos')) || [];
    }
  
    eliminarProductoLocalStorage(productoID) {
      let productosLS = this.obtenerProductosLocalStorage();
      productosLS = productosLS.filter(producto => producto.id !== productoID);
      this.guardarProductosLocalStorage(productosLS);
    }
  
    leerLocalStorage() {
      let productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(producto => {
        this.insertarCarrito(producto);
      });
    }
  
    vaciarLocalStorage() {
      localStorage.removeItem('productos');
    }
  
    procesarPedido(e) {
      e.preventDefault();
      if (this.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'El carrito está vacío, agrega un producto',
          timer: 2500,
          showConfirmButton: false
        });
      } else {
        location.href = "carrito.html";
      }
    }
  
    calcularTotal() {
      let total = 0;
      let productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(producto => {
        total += producto.precio * producto.cantidad;
      });
      const subtotal = total - (total * 0.18);
      document.getElementById('subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)}`;
      document.getElementById('total').textContent = `Total: ${total.toFixed(2)}`;
    }
  }
  
