// arreglos
const productos = [
    { id: 1, plantilla: 'los simpsons 1', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-1.png" },
    { id: 2, plantilla: 'los simpsons 2', material: 'ceramica', precio: 1100, img: "./imagenes/catalogo/muestra-2.png" },
    { id: 3, plantilla: 'los simpsons 3', material: 'ceramica', precio: 1000, img: "./imagenes/catalogo/muestra-3.png" },
    { id: 4, plantilla: 'los simpsons 4', material: 'ceramica', precio: 1250, img: "./imagenes/catalogo/muestra-4.png" },
    { id: 5, plantilla: 'los simpsons 5', material: 'ceramica', precio: 1500, img: "./imagenes/catalogo/muestra-5.png" },
    { id: 6, plantilla: 'los simpsons 6', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-6.png" },
    { id: 7, plantilla: 'los simpsons 7', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-7.png" },
    { id: 8, plantilla: 'los simpsons 8', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-8.png" },
    { id: 9, plantilla: 'los simpsons 9', material: 'polimero', precio: 800, img: "./imagenes/catalogo/muestra-9.png" },
    { id: 10, plantilla: 'los simpsons 10', material: 'polimero', precio: 500, img: "./imagenes/catalogo/muestra-10.png" },

];

// variables
let boton = document.getElementById("boton");
let contenedor = document.getElementById("contenedor");
let carrito = localStorage.getItem("storageCarrito") ? JSON.parse(localStorage.getItem("storageCarrito")) : []
let iconoCarrito = document.getElementById("carritoContenedor");
let listaCarrito = document.getElementById("listaCarrito")
let totalCarrito = 0;
iconoCarrito.innerHTML = carrito.length;
let usuariosNuevos = [];
let formulario = document.getElementById("formulario");
let contenedorHistorial = document.getElementById("historialUsuarios");
let historial = document.getElementById("botonHistorial");
let contenedorUsuario = document.getElementById("usuario");


productos.forEach((producto) => {
    let modelo = document.createElement("div");
    modelo.innerHTML = `
    <div class="producto">
    <img class="imagen" src=${producto.img} <br>
    <h5 class="card-title">Plantilla: ${producto.plantilla}</h5>
    <h5 class="card-title">Material: ${producto.material}</h5>
    <h5 class="card-title">Precio: $${producto.precio}</h5>
    <ul class="list-group list-group-flush">
        <button data-id="${producto.id}" class="btn btn-primary agregar">Agregar al carrito</button>
    </ul>
    </div>
    `
    contenedor.append(modelo);
});

let botones = document.querySelectorAll(".agregar");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const item = productos.find((producto) => producto.id === parseInt(boton.dataset.id))
        carrito.push(item);

        iconoCarrito.innerHTML = carrito.length;
        localStorage.setItem("storageCarrito", JSON.stringify(carrito))
    })
});

// eventos
iconoCarrito.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const { plantilla, precio, img, id } = producto
        listaCarrito.innerHTML += `
        <li>
      <img class="img-carrito" src="${img}" alt="imagen de taza">
        <p> ${plantilla} Precio: $${precio}</p>
        <a class="eliminar" data-id="${id}" data-precio="${precio}"> x </a>
        </li> 
        `
        totalCarrito += parseInt(precio);
    })
    listaCarrito.innerHTML += `<li id="totalLista">Total: $${totalCarrito}</li>`;
   
    let botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const item = carrito.find((producto) => producto.id === parseInt(boton.dataset.id));
            const index = carrito.indexOf(item);
            if (index > -1) {
                carrito.splice(index, 1);
            }
            totalCarrito -= parseInt(boton.dataset.precio)
            document.getElementById("totalLista").innerHTML = `Total: $${totalCarrito}`;
            localStorage.removeItem("storageCarrito");
            localStorage.setItem("storageCarrito", JSON.stringify(carrito));
            boton.parentElement.remove();
            iconoCarrito.innerHTML = carrito.length;

        })
    })
})

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputs = e.target.children;

    let usuario = {
        nombre: inputs[1].value,
        edad: inputs[3].value,
    };

    alert(`hola ${usuario.nombre}, bienvenido a tazarpado! `);
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

historial.addEventListener("click", () => {
    let usuariosStorage = JSON.parse(localStorage.getItem("usuariosStorage"));

    usuariosStorage.forEach(usuario => {
        historial = document.createElement("div");
        historial.innerHTML = `
        Nombre: ${usuario.nombre}
        Edad: ${usuario.edad}
        `;

        contenedorHistorial.append(historial);
    });
});