const express = require('express');
const { Router } = express;

const routerProductos = new Router();
const Productos = require('../container/Productos');
const ProductService = new Productos();

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    };
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
    } else {
        error.descripcion = 'no autorizado';
    }
    return error;
}

// Middleware para Administrador
const esAdmin = true;

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin(req.url, req.method));
    } else {
        next();
    }
}

routerProductos.get('/', async (req, res) => {
    res.json({productos: ProductService.getAll()});
});
routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = ProductService.getProduct(id);
    res.json(producto);
});
routerProductos.post('/', soloAdmins, async (req, res) => {
    const producto = req.body;
    const id = ProductService.addProduct(producto);
    res.send(`Se guardo el producto con el id: ${id}.`);
});
routerProductos.put('/:id', soloAdmins, async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = req.body;
    const response = ProductService.editProduct(id, producto);
    res.send(response);
});
routerProductos.delete('/:id', soloAdmins, async (req, res) => {
    const id = parseInt(req.params.id);
    const response = ProductService.deleteProduct(id);
    res.send(response);
});

module.exports = routerProductos;