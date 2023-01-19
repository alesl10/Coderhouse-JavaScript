// variables

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector(".carrito-acciones-comprar");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoProductos = document.getElementById("contenedor");
const contenedorTotal = document.querySelector("#total");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const total = document.querySelector("#total");
let contenedorUsuario = document.getElementById("usuario");

// funciones

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
        <img src="${producto.img}" class="carrito-producto-imagen" alt="">
            <div class="carrito-producto-titulo">
                <small>titulo</small>
                <h4>${producto.plantilla} ${producto.material}</h4>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad} </p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `
            contenedorCarritoProductos.append(div);


        })
        actualizarBotonesEliminar()
        actualizarTotal();
    } else {
        carritoVacio.classList.remove("disabled");
        carritoAcciones.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
    }

}



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "No podras revertirlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.splice(index, 1);
            cargarProductosCarrito();

            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            swalWithBootstrapButtons.fire(
                'Borrado',
                'Su producto ha sido borrado del carrito',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelar',
                'su producto sigue en el carrito! :)',
                'error'
            )
        }
    })


}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

function comprarCarrito() {
    Swal.fire({
        icon: 'success',
        title: '=)',
        text: '¡Muchas gracia por tu compra!',
        footer: 'nos contactaremos via E-mail para continuar'
      })
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

// eventos

cargarProductosCarrito();

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            Swal.fire(
                'Borrado!',
                'Su carrito ha sido vaciado.',
                'success'
            )
        }
    })

}


botonComprar.addEventListener("click", comprarCarrito);


