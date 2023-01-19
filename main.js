// arreglos
const productos = [
    { id: "taza-1", plantilla: 'los simpsons 1', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-1.png" },
    { id: "taza-2", plantilla: 'los simpsons 2', material: 'ceramica', precio: 1100, img: "./imagenes/catalogo/muestra-2.png" },
    { id: "taza-3", plantilla: 'los simpsons 3', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-3.png" },
    { id: "taza-4", plantilla: 'los simpsons 4', material: 'ceramica', precio: 1250, img: "./imagenes/catalogo/muestra-4.png" },
    { id: "taza-5", plantilla: 'los simpsons 5', material: 'ceramica', precio: 1500, img: "./imagenes/catalogo/muestra-5.png" },
    { id: "taza-6", plantilla: 'los simpsons 6', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-6.png" },
    { id: "taza-7", plantilla: 'los simpsons 7', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-7.png" },
    { id: "taza-8", plantilla: 'los simpsons 8', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-8.png" },
    { id: "taza-9", plantilla: 'los simpsons 9', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-9.png" },
    { id: "taza-10", plantilla: 'los simpsons 10', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-10.png" },
    { id: "taza-1", plantilla: 'los simpsons 1', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-1.png" },
    { id: "taza-2", plantilla: 'los simpsons 2', material: 'ceramica', precio: 1100, img: "./imagenes/catalogo/muestra-2.png" },
    { id: "taza-3", plantilla: 'los simpsons 3', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-3.png" },
    { id: "taza-4", plantilla: 'los simpsons 4', material: 'ceramica', precio: 1250, img: "./imagenes/catalogo/muestra-4.png" },
    { id: "taza-5", plantilla: 'los simpsons 5', material: 'ceramica', precio: 1500, img: "./imagenes/catalogo/muestra-5.png" },
    { id: "taza-6", plantilla: 'los simpsons 6', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-6.png" },
    { id: "taza-7", plantilla: 'los simpsons 7', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-7.png" },
    { id: "taza-8", plantilla: 'los simpsons 8', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-8.png" },
    { id: "taza-9", plantilla: 'los simpsons 9', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-9.png" },
    { id: "taza-10", plantilla: 'los simpsons 10', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-10.png" },

];

// variables
let boton = document.getElementById("boton");
let contenedor = document.getElementById("contenedor");
let carrito = localStorage.getItem("storageCarrito") ? JSON.parse(localStorage.getItem("storageCarrito")) : []
let listaCarrito = document.getElementById("listaCarrito")
let totalCarrito = 0;
let usuariosNuevos = [];
let formulario = document.getElementById("formulario");
let sociosAmigos = document.getElementById("botonHistorial");
let contenedorUsuario = document.getElementById("usuario");
let botonesAgregar = document.querySelectorAll(".agregar");
let numerito = document.querySelector("#numerito");
let categorias = document.querySelectorAll(".categoria")

function cargarProductos(productosElegidos) {
    productosElegidos.forEach(producto => {

        let modelo = document.createElement("div");
        modelo.innerHTML = `
    <div class="producto">
    <img class="imagen" src=${producto.img} <br>
    <h5 class="card-title">Plantilla: ${producto.plantilla}</h5>
    <h5 class="card-title">Material: ${producto.material}</h5>
    <h5 class="card-title">Precio: $${producto.precio}</h5>
    <ul class="list-group list-group-flush">
        <button id="${producto.id}" class="btn btn-primary agregar">Agregar al carrito</button>
    </ul>
    </div> 
    `
        contenedor.append(modelo);
    })
    actualizarBotonesAgregar();
};


cargarProductos(productos);


categorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        categorias.forEach(boton => boton.classList.remove("activo"));
        e.currentTarget.classList.add("activo");
        contenedor.innerHTML = "";

        let productosfiltrados = productos.filter(producto => producto.material == e.currentTarget.id);

        if (e.currentTarget.id != "todos") {
            cargarProductos(productosfiltrados);
        } else {
            cargarProductos(productos);
        };

    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    })
}

let productosEnCarrito;
let productosEnCarritoLs = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLs) {
    productosEnCarrito = JSON.parse(productosEnCarritoLs);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarCarrito(e) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Producto agregado a carrito'
    })
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito;
}

// socios amigos por fetch

const input = document.querySelector("#searchInput")
const userlist = document.querySelector("#users")


sociosAmigos.addEventListener("click", async () => {
   const data = await cargarSocio()
   let socios = data
   renderSocios(socios)
});

async function cargarSocio() {
    const response = await fetch("comerciosAmigos.json")
    return await response.json()
}

const crearSocioItems = socios => socios.map(socio => 
    `
    <div class="producto socio">
    <img class="imagen" src=${socio.img} <br>
    <h5 class="card-title">Nombre: ${socio.nombre}</h5>
    <h5 class="card-title">Direccion: ${socio.direccion}</h5>
    <a class="card-title">Web: ${socio.web}</a>
    </div> 
    `).join (" ")


function renderSocios(socios) {
    const itemsString = crearSocioItems(socios)
    userlist.innerHTML = itemsString

}

// USUARIOS

formulario.addEventListener("submit", (e) => {
    contenedorUsuario.innerHTML = "";
    e.preventDefault();

    let inputs = e.target.children;

    let usuario = {
        nombre: inputs[1].value,
        edad: inputs[3].value,
    };

    Swal.fire({
        title: `hola ${usuario.nombre}, bienvenido a tazarpado!`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });

    let usuarioLogueado = document.createElement("a");
    usuarioLogueado.innerHTML = `  
    ${usuario.nombre}
    `
    contenedorUsuario.append(usuarioLogueado);


    let usuariosStorage = JSON.parse(localStorage.getItem("usuariosStorage"));
    if (usuariosStorage) {
        usuariosNuevos = usuariosStorage;
    } else {
        usuariosNuevos = [];
    }

    usuariosNuevos.push(usuario);
    localStorage.setItem("usuariosStorage", JSON.stringify(usuariosNuevos));

});
