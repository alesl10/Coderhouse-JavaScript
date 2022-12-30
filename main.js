const productos = [
    { img: "./imagenes/catalogo/muestra-1.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img: "./imagenes/catalogo/muestra-2.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img: "./imagenes/catalogo/muestra-3.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img: "./imagenes/catalogo/muestra-4.png", precio: 1250, material: "ceramica", plantilla: "Mundial Argentina" },
    { img: "./imagenes/catalogo/muestra-5.png", precio: 1250, material: "ceramica", plantilla: "Mundial Argentina" },
    { img: "./imagenes/catalogo/muestra-6.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
    { img: "./imagenes/catalogo/muestra-7.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
    { img: "./imagenes/catalogo/muestra-8.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
];

let boton = document.getElementById("boton");
let contenedor = document.getElementById("contenedor");


productos.forEach(item => {
    let modelo = document.createElement("div");
    modelo.innerHTML = `
    <div class="producto">
    <img class="imagen" src=${item.img} <br>
    <h5 class="card-title">Plantilla: ${item.plantilla}</h5>
    <h5 class="card-title">Material: ${item.material}</h5>
    <h5 class="card-title">Precio: $${item.precio}</h5>
    <ul class="list-group list-group-flush">
        <button class="list-group-item">Agregar a carrito</button>
        <button class="list-group-item">Comprar</button>
        <button class="list-group-item">Marcar como favorito</button>
    </ul>
    </div>
    `
    contenedor.append(modelo);
})


let usuariosNuevos = [];

let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputs = e.target.children;
    
    let usuario = {
        nombre: inputs[1].value,
        edad: inputs[3].value,
    };

alert(`hola ${usuario.nombre}, bienvenido a tazarpado! `);

    let usuariosStorage = JSON.parse(localStorage.getItem("usuariosStorage"));
    if (usuariosStorage) {
        usuariosNuevos = usuariosStorage;
    } else {
        usuariosNuevos = [];
    }

    usuariosNuevos.push(usuario);
    localStorage.setItem("usuariosStorage", JSON.stringify(usuariosNuevos));
    
});

let contenedorHistorial = document.getElementById("historialUsuarios");
let historial = document.getElementById("botonHistorial");

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



// primera forma de usar boton

// boton.addEventListener("click", filtrar);
// function filtrar() {

//     let material = prompt(`ingrese de que material desea su taza, las opciones son "ceramica" o "polimero"`).toLowerCase();
//     let precio = parseInt(prompt("ingrese su precio maximo"));
//     let filtrados = productos.filter(item => item.precio <= precio && (item.material == material || material == ""));

//     filtrados.forEach(item => {
//         let modelo = document.createElement("div");
//         modelo.innerHTML = `
//     <div class="producto">
//     <img class="imagen" src=${item.img} <br>
//     <h5 class="card-title">Plantilla: ${item.plantilla}</h5>
//     <h5 class="card-title">Material: ${item.material}</h5>
//     <h5 class="card-title">Precio: $${item.precio}</h5>
//     <ul class="list-group list-group-flush">
//         <button class="list-group-item">Agregar a carrito</button>
//         <button class="list-group-item">Comprar</button>
//         <button class="list-group-item">Marcar como favorito</button>
//     </ul>
//     </div>
//     `
//         // modelo.className("producto");
//         contenedor.append(modelo);
//     });
// }



