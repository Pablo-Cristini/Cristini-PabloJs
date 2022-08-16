const elementosCarrito = JSON.parse(localStorage.getItem("carrito"));
let carrito = [];
let total = 0;

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}` 
    document.getElementById("seccion-card").innerHTML += `<div class="card d-flex col-4">
        <div class="precio">$${producto.precio}</div>
        <h4>${producto.title}</h4>
        <button class="boton"><i class="fas fa-shopping-cart"><a id="${idButton}" data-id="${producto.id}">Añadir Al Carrito</a></button>  
    </div>`;
});

productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}` 
    document.getElementById(idButton).addEventListener('click', (event) => {
        const nodo = event.target;
        const idProducto = nodo.getAttribute("data-id");
        const indiceProducto = productos.findIndex(producto => producto.id == idProducto);
        const producto = productos[indiceProducto];
        carrito.push(producto);
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        document.getElementById("cart-total").innerHTML = `${carrito.length}  $${total}`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
            text:"Producto agregado",
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: false,
            style: {background: "#1fff39"},
            onClick: function(){}
        }).showToast();
    });
});

const vaciarCarrito = document.getElementById('vaciar-carrito');
vaciarCarrito.addEventListener('click',() => {
    document.getElementById("cart-total").innerHTML = `${carrito.length}  $${total}`;

    Swal.fire({
        title: 'Desea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
        Swal.fire(
            'Vacio',
            'Se han borrado los productos del carrito',
            'success'
        )} else if (result.isDenied) {
            carrito = carrito;
        }
    })
});
