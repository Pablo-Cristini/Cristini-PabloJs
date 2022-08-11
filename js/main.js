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
    });
});

const vaciarCarrito = document.getElementById('vaciar-carrito');
vaciarCarrito.addEventListener('click',() => {
    carrito = [];
    document.getElementById("cart-total").innerHTML = `${carrito.length}  $${total}`;
});
