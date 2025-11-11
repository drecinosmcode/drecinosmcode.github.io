const productos = [
    {
        id: 1,
        nombre: "Laptop Dell XPS 13",
        precio: 1299.99,
        categoria: "laptops",
        imagen: "https://via.placeholder.com/300x200?text=Laptop+Dell+XPS+13",
        descripcion: "Laptop ultradelgada con pantalla InfinityEdge y procesador Intel Core i7.",
        video: "https://www.youtube.com/embed/Ewfowr2Iwr0"
    },
    {
        id: 2,
        nombre: "iPhone 14 Pro",
        precio: 999.99,
        categoria: "smartphones",
        imagen: "https://via.placeholder.com/300x200?text=iPhone+14+Pro",
        descripcion: "Smartphone premium con cámara de 48MP y Dynamic Island.",
        video: "https://www.youtube.com/embed/fqaBXpObsQg"
    },
    {
        id: 3,
        nombre: "Samsung Galaxy Tab S8",
        precio: 699.99,
        categoria: "tablets",
        imagen: "https://via.placeholder.com/300x200?text=Samsung+Galaxy+Tab+S8",
        descripcion: "Tablet Android de alto rendimiento con S Pen incluido.",
        video: "https://www.youtube.com/embed/KPrpKUQ5vlk"
    },
    {
        id: 4,
        nombre: "Auriculares Sony WH-1000XM4",
        precio: 349.99,
        categoria: "accesorios",
        imagen: "https://via.placeholder.com/300x200?text=Sony+WH-1000XM4",
        descripcion: "Auriculares con cancelación de ruido y 30 horas de batería.",
        video: "https://www.youtube.com/embed/WKdotkKJQYQ"
    },
    {
        id: 5,
        nombre: "MacBook Air M2",
        precio: 1199.99,
        categoria: "laptops",
        imagen: "https://via.placeholder.com/300x200?text=MacBook+Air+M2",
        descripcion: "Laptop ultraligera con chip M2 y pantalla Retina.",
        video: "https://www.youtube.com/embed/JOJcl5dkg50"
    },
    {
        id: 6,
        nombre: "Samsung Galaxy S23",
        precio: 849.99,
        categoria: "smartphones",
        imagen: "https://via.placeholder.com/300x200?text=Samsung+Galaxy+S23",
        descripcion: "Smartphone Android con cámara profesional y Snapdragon 8 Gen 2.",
        video: "https://www.youtube.com/embed/iBvfhAuSdUQ"
    },
    {
        id: 7,
        nombre: "iPad Air",
        precio: 599.99,
        categoria: "tablets",
        imagen: "https://via.placeholder.com/300x200?text=iPad+Air",
        descripcion: "Tablet versátil con chip M1 y compatibilidad con Apple Pencil.",
        video: "https://www.youtube.com/embed/s8Z3ZGPsEXE"
    },
    {
        id: 8,
        nombre: "Teclado Mecánico Logitech",
        precio: 129.99,
        categoria: "accesorios",
        imagen: "https://via.placeholder.com/300x200?text=Teclado+Logitech",
        descripcion: "Teclado mecánico con switches Romer-G y retroiluminación RGB.",
        video: "https://www.youtube.com/embed/JaszAd88NVI"
    }
];

let estado = {
    usuarioLogueado: false,
    carrito: [],
    productosFiltrados: [...productos]
};

const elementos = {
    inicio: document.getElementById('inicio'),
    login: document.getElementById('login'),
    productos: document.getElementById('productos'),
    carrito: document.getElementById('carrito'),
    confirmacion: document.getElementById('confirmacion'),
    
    loginLink: document.getElementById('login-link'),
    carritoLink: document.getElementById('carrito-link'),
    
    loginForm: document.getElementById('login-form'),
    mensajeLogin: document.getElementById('mensaje-login'),
    
    listaProductos: document.getElementById('lista-productos'),
    categoriaFiltro: document.getElementById('categoria'),
    ordenFiltro: document.getElementById('orden'),
    verProductosBtn: document.getElementById('ver-productos-btn'),
    
    contadorCarrito: document.getElementById('contador-carrito'),
    carritoVacio: document.getElementById('carrito-vacio'),
    carritoContenido: document.getElementById('carrito-contenido'),
    carritoItems: document.getElementById('carrito-items'),
    totalCarrito: document.getElementById('total-carrito'),
    vaciarCarritoBtn: document.getElementById('vaciar-carrito'),
    finalizarCompraBtn: document.getElementById('finalizar-compra'),
    
    volverInicioBtn: document.getElementById('volver-inicio'),
    
    modal: document.getElementById('modal-producto'),
    modalContenido: document.getElementById('modal-contenido'),
    cerrarModal: document.querySelector('.cerrar')
};

document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
    mostrarSeccion('inicio');
    renderizarProductos();
});

function inicializarEventos() {
    elementos.loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion('login');
    });
    
    elementos.carritoLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (estado.usuarioLogueado) {
            mostrarSeccion('carrito');
            renderizarCarrito();
        } else {
            mostrarSeccion('login');
            elementos.mensajeLogin.textContent = 'Debe iniciar sesión para acceder al carrito';
            elementos.mensajeLogin.style.color = '#e74c3c';
        }
    });
    
    elementos.verProductosBtn.addEventListener('click', () => {
        mostrarSeccion('productos');
    });
    
    elementos.loginForm.addEventListener('submit', manejarLogin);
    
    elementos.categoriaFiltro.addEventListener('change', filtrarProductos);
    elementos.ordenFiltro.addEventListener('change', filtrarProductos);
    
    elementos.vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    elementos.finalizarCompraBtn.addEventListener('click', finalizarCompra);
    
    elementos.volverInicioBtn.addEventListener('click', () => {
        mostrarSeccion('inicio');
    });
    
    elementos.cerrarModal.addEventListener('click', () => {
        elementos.modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === elementos.modal) {
            elementos.modal.style.display = 'none';
        }
    });
}

function mostrarSeccion(seccion) {
    elementos.inicio.style.display = 'none';
    elementos.login.style.display = 'none';
    elementos.productos.style.display = 'none';
    elementos.carrito.style.display = 'none';
    elementos.confirmacion.style.display = 'none';
    
    switch(seccion) {
        case 'inicio':
            elementos.inicio.style.display = 'block';
            break;
        case 'login':
            elementos.login.style.display = 'block';
            break;
        case 'productos':
            elementos.productos.style.display = 'block';
            break;
        case 'carrito':
            elementos.carrito.style.display = 'block';
            break;
        case 'confirmacion':
            elementos.confirmacion.style.display = 'block';
            break;
    }
}

function manejarLogin(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    
    if (usuario === 'alumno' && contrasena === '2025') {
        estado.usuarioLogueado = true;
        elementos.mensajeLogin.textContent = '¡Inicio de sesión exitoso!';
        elementos.mensajeLogin.style.color = '#2ecc71';
        
        setTimeout(() => {
            mostrarSeccion('productos');
        }, 1000);
    } else {
        elementos.mensajeLogin.textContent = 'Usuario o contraseña incorrectos';
        elementos.mensajeLogin.style.color = '#e74c3c';
    }
}

function renderizarProductos() {
    elementos.listaProductos.innerHTML = '';
    
    estado.productosFiltrados.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.className = 'producto-card';
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <div class="producto-acciones">
                    <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
                    <button class="btn-detalles" data-id="${producto.id}">Ver Detalles</button>
                </div>
            </div>
        `;
        
        elementos.listaProductos.appendChild(productoElemento);
    });
    
    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (!estado.usuarioLogueado) {
                mostrarSeccion('login');
                elementos.mensajeLogin.textContent = 'Debe iniciar sesión para agregar productos al carrito';
                elementos.mensajeLogin.style.color = '#e74c3c';
                return;
            }
            
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
    
    document.querySelectorAll('.btn-detalles').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            mostrarDetallesProducto(id);
        });
    });
}

function filtrarProductos() {
    const categoria = elementos.categoriaFiltro.value;
    const orden = elementos.ordenFiltro.value;
    
    let productosFiltrados = categoria === 'todos' 
        ? [...productos] 
        : productos.filter(p => p.categoria === categoria);
    
    switch(orden) {
        case 'nombre':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'precio-asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
    }
    
    estado.productosFiltrados = productosFiltrados;
    renderizarProductos();
}


function mostrarDetallesProducto(id) {
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        elementos.modalContenido.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; max-height: 300px; object-fit: cover; margin: 1rem 0;">
            <p><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <div style="margin: 1rem 0;">
                <h3>Video del Producto</h3>
                <iframe width="100%" height="315" src="${producto.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            ${estado.usuarioLogueado ? `<button class="btn-agregar" data-id="${producto.id}" style="margin-top: 1rem;">Agregar al Carrito</button>` : ''}
        `;
        
        elementos.modal.style.display = 'block';
        
        const botonAgregar = elementos.modalContenido.querySelector('.btn-agregar');
        if (botonAgregar) {
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(id);
                elementos.modal.style.display = 'none';
            });
        }
    }
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        const itemExistente = estado.carrito.find(item => item.id === id);
        
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            estado.carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        actualizarContadorCarrito();
        
        alert(`¡${producto.nombre} agregado al carrito!`);
    }
}

function actualizarContadorCarrito() {
    const totalItems = estado.carrito.reduce((total, item) => total + item.cantidad, 0);
    elementos.contadorCarrito.textContent = totalItems;
}

function renderizarCarrito() {
    if (estado.carrito.length === 0) {
        elementos.carritoVacio.style.display = 'block';
        elementos.carritoContenido.style.display = 'none';
        return;
    }
    
    elementos.carritoVacio.style.display = 'none';
    elementos.carritoContenido.style.display = 'block';
    
    elementos.carritoItems.innerHTML = '';
    
    let total = 0;
    
    estado.carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        const itemElemento = document.createElement('div');
        itemElemento.className = 'carrito-item';
        itemElemento.innerHTML = `
            <div class="carrito-item-info">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
                <div class="carrito-item-detalles">
                    <h4>${item.nombre}</h4>
                    <p>Precio: $${item.precio.toFixed(2)}</p>
                    <div class="carrito-item-cantidad">
                        <button class="disminuir" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="aumentar" data-id="${item.id}">+</button>
                    </div>
                    <p>Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
            </div>
            <button class="carrito-item-eliminar" data-id="${item.id}">Eliminar</button>
        `;
        
        elementos.carritoItems.appendChild(itemElemento);
    });
    
    elementos.totalCarrito.textContent = total.toFixed(2);
    

    document.querySelectorAll('.disminuir').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            disminuirCantidad(id);
        });
    });
    
    document.querySelectorAll('.aumentar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            aumentarCantidad(id);
        });
    });
    
    document.querySelectorAll('.carrito-item-eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(id);
        });
    });
}

function disminuirCantidad(id) {
    const item = estado.carrito.find(item => item.id === id);
    
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad -= 1;
        } else {
            estado.carrito = estado.carrito.filter(item => item.id !== id);
        }
        
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}


function aumentarCantidad(id) {
    const item = estado.carrito.find(item => item.id === id);
    
    if (item) {
        item.cantidad += 1;
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}


function eliminarDelCarrito(id) {
    estado.carrito = estado.carrito.filter(item => item.id !== id);
    renderizarCarrito();
    actualizarContadorCarrito();
}


function vaciarCarrito() {
    if (confirm('¿Está seguro de que desea vaciar el carrito?')) {
        estado.carrito = [];
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}


function finalizarCompra() {
    if (estado.carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    

    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;
    
    // En una aplicación real, aquí se procesaría el pago
    alert(`Compra realizada con éxito! Método de pago: ${metodoPago}`);
    
  
    estado.carrito = [];
    actualizarContadorCarrito();
    mostrarSeccion('confirmacion');
}
