class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.cantidadBodega = cantidadBodega;
        this.cantidadMinimaBodega = cantidadMinimaBodega;
        this.cantidadMaximaInventario = cantidadMaximaInventario;
        this.porcentajeDescuento = porcentajeDescuento;
    }

    solicitarPedido() {
        return this.cantidadBodega < this.cantidadMinimaBodega;
    }

    calcularTotalAPagar(cantidadCompra) {
        return cantidadCompra * this.precioCompra * (1 - this.porcentajeDescuento / 100);
    }
}

class PrendasDeVestir extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
        this.permitePlanchado = permitePlanchado;
    }
}

class Calzado extends Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento);
        this.talla = talla;
    }
}

function menu() {
    const prendasDeVestir = [];
    const calzados = [];

    let numPrendas = parseInt(prompt("Ingrese el número de productos de tipo prendas de vestir a manejar:"));
    let numCalzados = parseInt(prompt("Ingrese el número de productos de tipo calzado a manejar:"));

    for (let i = 0; i < numPrendas; i++) {
        let codigo = prompt("Ingrese el código de la prenda de vestir:");
        let descripcion = prompt("Ingrese la descripción de la prenda de vestir:");
        let precioCompra = parseFloat(prompt("Ingrese el precio de compra de la prenda de vestir:"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta de la prenda de vestir:"));
        let cantidadBodega = parseInt(prompt("Ingrese la cantidad en bodega de la prenda de vestir:"));
        let cantidadMinimaBodega = parseInt(prompt("Ingrese la cantidad mínima requerida en bodega de la prenda de vestir:"));
        let cantidadMaximaInventario = parseInt(prompt("Ingrese la cantidad máxima de inventario permitida de la prenda de vestir:"));
        let porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento de la prenda de vestir:"));
        let talla = prompt("Ingrese la talla de la prenda de vestir (S, M, L, etc.):");
        let permitePlanchado = prompt("¿Permite planchado? (verdadero/falso):").toLowerCase() === 'verdadero';

        prendasDeVestir.push(new PrendasDeVestir(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla, permitePlanchado));
    }

    for (let i = 0; i < numCalzados; i++) {
        let codigo = prompt("Ingrese el código del calzado:");
        let descripcion = prompt("Ingrese la descripción del calzado:");
        let precioCompra = parseFloat(prompt("Ingrese el precio de compra del calzado:"));
        let precioVenta = parseFloat(prompt("Ingrese el precio de venta del calzado:"));
        let cantidadBodega = parseInt(prompt("Ingrese la cantidad en bodega del calzado:"));
        let cantidadMinimaBodega = parseInt(prompt("Ingrese la cantidad mínima requerida en bodega del calzado:"));
        let cantidadMaximaInventario = parseInt(prompt("Ingrese la cantidad máxima de inventario permitida del calzado:"));
        let porcentajeDescuento = parseFloat(prompt("Ingrese el porcentaje de descuento del calzado:"));
        let talla = parseInt(prompt("Ingrese la talla del calzado (35, 36, 37, etc.):"));

        calzados.push(new Calzado(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinimaBodega, cantidadMaximaInventario, porcentajeDescuento, talla));
    }


    alert("Prendas de vestir:");
    prendasDeVestir.forEach(prenda => {
        alert(`Código: ${prenda.codigo}, Descripción: ${prenda.descripcion}, Precio de Compra: ${prenda.precioCompra}, Precio de Venta: ${prenda.precioVenta}, Cantidad en Bodega: ${prenda.cantidadBodega}, Cantidad Mínima: ${prenda.cantidadMinimaBodega}, Cantidad Máxima: ${prenda.cantidadMaximaInventario}, Descuento: ${prenda.porcentajeDescuento}%, Talla: ${prenda.talla}, Permite Planchado: ${prenda.permitePlanchado}`);
    });

    alert("Calzados:");
    calzados.forEach(calzado => {
        alert(`Código: ${calzado.codigo}, Descripción: ${calzado.descripcion}, Precio de Compra: ${calzado.precioCompra}, Precio de Venta: ${calzado.precioVenta}, Cantidad en Bodega: ${calzado.cantidadBodega}, Cantidad Mínima: ${calzado.cantidadMinimaBodega}, Cantidad Máxima: ${calzado.cantidadMaximaInventario}, Descuento: ${calzado.porcentajeDescuento}%, Talla: ${calzado.talla}`);
    });
}

menu();