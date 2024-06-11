class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(index) {
        if (index >= 0 && index < this.productos.length) {
            this.productos.splice(index, 1);
        }
    }

    calcularTotal() {
        let total = 0;
        for (const producto of this.productos) {
            total += producto.precio;
        }
        return total;
    }
}

const menu = [
    new Producto("Camisa", 20),
    new Producto("Pantalón", 30),
    new Producto("Zapatos", 50),
    new Producto("Bufanda", 15),
    new Producto("Sombrero", 25)
];

const carrito = new Carrito();

function mostrarMenu() {
    console.log("=== Menú de Compras ===");
    menu.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
    console.log("0. Terminar compra");
}

function mostrarCarrito() {
    console.log("=== Carrito de Compras ===");
    carrito.productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
    console.log(`Total: $${carrito.calcularTotal()}`);
}

function realizarCompra() {
    mostrarMenu();
    const opcion = parseInt(prompt("Seleccione un producto para agregar al carrito (0 para terminar compra):"));
    if (opcion === 0) {
        mostrarCarrito();
        return;
    }
    const productoSeleccionado = menu[opcion - 1];
    carrito.agregarProducto(productoSeleccionado);
    console.log(`${productoSeleccionado.nombre} ha sido agregado al carrito.`);
    realizarCompra();
}

realizarCompra();


