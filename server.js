const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routerProductos = require('./routes/productos.Router');
const routerCarrito = require('./routes/carrito.Router');

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);
app.get('*', function(req, res) {
    res.send({status: "error", description: `ruta ${req.url} método ${req.method} no implementada.`});
})

module.exports = app;