const fs = require('fs/promises');

class Carrito {
    constructor(path='./db/carrito.json'){
        this.path = path;
        /*
        Array con carritos, que son objetos con esta estructura:
            {
                id: Number (incrementado en esta clase automaticamente),
                timestamp: Date,
                productos: Array of {Productos}
            }
        */
        try{
            fs.readFile(path,'utf-8')
            .then(data => {
                this.carritos = JSON.parse(data);
            })
        }catch(error){
            console.error(error);
            this.carritos = [];
        }
    }
    createCarrito(){
        const id = this.carritos.length==0 ? 1 : this.carritos[this.carritos.length-1].id + 1;
        const carrito = {
            id: id,
            timestamp: Date.now(),
            productos: []
        }
        this.carritos.push(carrito);
        fs.writeFile(this.path, JSON.stringify(this.carritos));
        return id;
    }
    deleteCarrito(id){
        const index = this.carritos.findIndex(element => element.id === id);
        if(this.carritos[index]){
            this.carritos.splice(index, 1);
            fs.writeFile(this.path, JSON.stringify(this.carritos));
            return `Carrito con id: ${id} fue borrado correctamente.`;
        }
        return {error: 'Carrito no encontrado'};
    }
    getProductos(id){
        const index = this.carritos.findIndex(element => element.id === id);
        if(this.carritos[index]){
            return this.carritos[index].productos;
        }
        return {error: 'Carrito no encontrado'};
    }
    //Agrega id del producto al array de productos del carrito.
    //Para mostrarlo en alguna vista, buscaría el ID del producto en el array de productos de la otra clase para obtener los datos.
    //Usando SQL, haría un join usando foreign keys.
    addProductos(id, productos){
        const index = this.carritos.findIndex(element => element.id === id);
        if(this.carritos[index]){
            productos.forEach(element => {
                this.carritos[index].productos.push(element);
                console.log(element);
            });
            fs.writeFile(this.path, JSON.stringify(this.carritos));
            return `Carrito con id: ${id} fue cargado con los productos enviados correctamente`;
        }
        return {error: 'Carrito no encontrado'};
    }
    deleteProducto(id_carrito, id_producto){
        const index = this.carritos.findIndex(element => element.id === id_carrito);
        if(this.carritos[index]){
            const i = this.carritos[index].productos.findIndex(element => element.id === id_producto);
            if(this.carritos[index].productos[i]){
                this.carritos[index].productos.splice(i,1);
                fs.writeFile(this.path, JSON.stringify(this.carritos));
            }
        }
        return {error: 'Carrito no encontrado'};
    }
}

module.exports=Carrito;