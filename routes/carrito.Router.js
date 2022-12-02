const express = require('express');
const { Router } = express;

const routerCarrito = new Router();
const Carrito = require('../container/Carrito');
const CarritoService = new Carrito();

routerCarrito.post('/', (req, res) => {
    //crear carrito y devolver id
    const id = CarritoService.createCarrito();
    res.send(`El ID del carrito creado es: ${id}`);
});
routerCarrito.delete('/:id', (req, res) => {
    //vaciar carrito y eliminarlo
    const id = parseInt(req.params.id);
    res.send(CarritoService.deleteCarrito(id));
});
routerCarrito.get('/:id/productos', (req, res) => {
    //listar productos en el carrito
    const id = parseInt(req.params.id);
    res.json(CarritoService.getProductos(id));
});
routerCarrito.post('/:id/productos', (req, res) => {
    //incorporar productos por su id de producto
    const id = parseInt(req.params.id);
    const productos = req.body.productos;
    res.send(CarritoService.addProductos(id, productos));
});
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    //eliminar producto del carrito por su id de carrito y producto.
    const id_carrito = parseInt(req.params.id);
    const id_producto = parseInt(req.params.id_prod);
    res.send(CarritoService.deleteProducto(id_carrito, id_producto));
});

module.exports = routerCarrito;