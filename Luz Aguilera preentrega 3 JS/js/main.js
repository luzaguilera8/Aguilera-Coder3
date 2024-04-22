let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];

const productos = [
    {
        titulo: "Bautismo",
        precio: 200,
        descripcion: "Sesión de fotos para el bautismo de tu hijo.",
        img: "img/images (1).jpeg"
    },
    {
        titulo: "Cumpleaños",
        precio: 300,
        descripcion: "Captura los mejores momentos de tu fiesta de cumpleaños.",
        img: "img/images (6).jpeg"
    },
    {
        titulo: "Casamiento",
        precio: 1000,
        descripcion: "Servicio fotográfico completo para tu boda.",
        img: "img/28061553517-e51204985a-o_5_273984-157533123513030.jpeg"
    },
    {
        titulo: "Egresados",
        precio: 400,
        descripcion: "Sesión de fotos para conmemorar tu graduación.",
        img: "img/3289dd9d5627bd754532b42394d441d2.jpg"
    },
    {
        titulo: "Sesión de Fotos",
        precio: 150,
        descripcion: "Sesión de fotos personalizada según tus preferencias.",
        img: "img/fotografia-primer-ano-exterior-1-00.jpg"
    }
];

const contenedorProductos = document.getElementById("productos");
const carritoProductos = document.getElementById("carrito");
const carritoTotal = document.getElementById("carrito-total");
const historialComprasDiv = document.getElementById("historial-compras");
const verComprasBtn = document.getElementById("ver-compras");
const listaHistorial = document.getElementById("lista-historial");

function renderizarProductos() {
    contenedorProductos.innerHTML = ''; 
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <h3>${producto.titulo}</h3>
            <img src="${producto.img}" alt="${producto.titulo}">
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.titulo}')">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function renderizarCarrito() {
    carritoProductos.innerHTML = ''; 
    let total = 0;

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <p>${item.titulo} - Cantidad: ${item.cantidad}</p>
            <p>Precio unitario: $${item.precio}</p>
            <p>Subtotal: $${item.precio * item.cantidad}</p>
        `;
        carritoProductos.appendChild(div);
        total += item.precio * item.cantidad;
    });

    carritoTotal.textContent = `Total: $${total}`;
}

function agregarAlCarrito(titulo) {
    const producto = productos.find(prod => prod.titulo === titulo);

    if (producto) {
        const itemEncontrado = carrito.find(item => item.titulo === titulo);

        if (itemEncontrado) {
            itemEncontrado.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarAlerta();
        renderizarCarrito(); // Actualizar el carrito después de agregar un producto
    } else {
        console.error("Producto no encontrado");
    }
}

function mostrarAlerta() {
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito(); // Actualizar el carrito después de vaciarlo
}

function mostrarHistorialCompras() {
    listaHistorial.innerHTML = '';
    historialCompras.forEach(compra => {
        const div = document.createElement("div");
        div.classList.add("historial-item");
        div.innerHTML = `
            <p>Fecha: ${compra.fecha}</p>
            <p>Total: $${compra.total}</p>
            <ul>
                ${compra.productos.map(item => `<li>${item.titulo} - Cantidad: ${item.cantidad}</li>`).join('')}
            </ul>
        `;
        listaHistorial.appendChild(div);
    });
    historialComprasDiv.style.display = 'block';
}

verComprasBtn.addEventListener('click', mostrarHistorialCompras);

function comprarProductos() {
    // Verificar si hay productos en el carrito
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito está vacío. Agrega productos antes de comprar.',
        });
        return;
    }

    // Agregar la compra al historial
    const fechaCompra = new Date().toLocaleString();
    historialCompras.push({ fecha: fechaCompra, productos: [...carrito], total: calcularTotalCarrito() });
    localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
}

function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    return total;
}

renderizarProductos();

