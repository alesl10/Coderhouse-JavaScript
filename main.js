const productos = [
    { img:"./imagenes/catalogo/muestra-1.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img:"./imagenes/catalogo/muestra-2.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img:"./imagenes/catalogo/muestra-3.png", precio: 1250, material: "ceramica", plantilla: "Los simpsons" },
    { img:"./imagenes/catalogo/muestra-4.png", precio: 1250, material: "ceramica", plantilla: "Mundial Argentina" },
    { img:"./imagenes/catalogo/muestra-5.png", precio: 1250, material: "ceramica", plantilla: "Mundial Argentina" },
    { img:"./imagenes/catalogo/muestra-6.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
    { img:"./imagenes/catalogo/muestra-7.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
    { img:"./imagenes/catalogo/muestra-8.png", precio: 850, material: "polimero", plantilla: "Mundial Argentina" },
];

let contenedor = document.getElementById("contenedor");
let nombre = prompt("buenas, bienvenidos a Tazarpado! decinos tu nombre");

alert("bienvenido " + nombre + " es un placer saludarte, ¡te vamos a ayudar con tu busqueda!");

let material = prompt(`ingrese de que material desea su taza, las opciones son "ceramica" o "polimero"`).toLowerCase();
let precio = parseInt(prompt("ingrese su precio minimo"));
let filtrados = productos.filter(item => item.precio >= precio && (item.material == material || material == ""));

filtrados.forEach(item => {
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
    // modelo.className("producto");
    contenedor.append(modelo);
});