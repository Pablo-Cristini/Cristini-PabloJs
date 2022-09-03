const elementosCarrito = JSON.parse(localStorage.getItem("carrito"));
let carrito = [];
let total = 0;
let ofertas = 0;

setTimeout(function(){
    Swal.fire({
        title: 'Queres aprovechar la promo del combo del mes? Hamburgusea doble, papas y gaseosa por solo $500',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [{id:2, title: "Hamburguesa Doble", precio: 300},{id:4, title: "Papas Fritas", precio: 100},{id:10, title: "Coca Cola", precio: 100}];
            total = 500;
            document.getElementById("cart-total").innerHTML = `${carrito.length} $${total}`;
        Swal.fire(
            'Agregado!',
        )} else if (result.isDenied) {
            carrito = [];
        }
    });
},1000)

const callApi = () => {
    fetch('http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires')
    .then(Response => Response.json())
    .then(info => { 
    let oferta = info.day_of_week;
    switch(info.day_of_week)  {
        case info.day_of_week = 1: ofertas = 50;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 2: ofertas = 75;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 3: ofertas = 100;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 4: ofertas = 125;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 5: ofertas = 150;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 6: ofertas = 250;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
        case info.day_of_week = 7: ofertas = 350;
        document.getElementById("textoOferta").innerHTML += `Hoy hay $${ofertas} de descuento`
        break;
    }
    })
}
callApi()

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
        total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0) - ofertas;
        document.getElementById("cart-total").innerHTML = `${carrito.length}  $${total}`
        localStorage.setItem("carrito", JSON.stringify(carrito));


        const pintarCarrito = () => { `add-cart${producto.id}` 
        document.getElementById("pro").innerHTML += `<div class="card d-flex col-4">
            <div class="precio">$${producto.precio}</div>
            <h4>${producto.title}</h4>
            </div>`;}
        pintarCarrito ()

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
            document.getElementById("cart-total").innerHTML = `${carrito.length}  $${0}`;
            document.getElementById("pro").innerHTML = " ";
        Swal.fire(
            'Vacio',
            'Se han borrado los productos del carrito',
            'success'
        )} else if (result.isDenied) {
            carrito = carrito;
        }
    })
});