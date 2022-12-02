const fs = require('fs/promises');

class Producto {
    constructor(path='./db/productos.json'){
        this.path = path;
        /*
        Array con productos, que son objetos con esta estructura:
            {
                id: Number (incrementado en esta clase automaticamente),
                timestamp: Date,
                nombre: String,
                descripcion: String,
                codigo: Number,
                url: String,
                precio: Number,
                stock: Number
            }
        */
        try{
            fs.readFile(path,'utf-8')
            .then(data => {
                this.products = JSON.parse(data);
            })
        }catch(error){
            console.error(error);
            this.products = [];
        }
    }

    getAll(){
        return this.products;
    }

    getProduct(id){
        const product = this.products.find(element => element.id === id);
        return product ? product : {error: 'producto no encontrado'};
    }

    addProduct(product){
        product.id = this.products.length==0 ? 1 : this.products[this.products.length-1].id + 1;
        this.products.push(product);
        fs.writeFile(this.path, JSON.stringify(this.products));
        return product.id;
    }

    editProduct(id, product){
        const index = this.products.findIndex(element => element.id == id);
        if (this.products[index]) {
            product.id = this.products[index].id;
            this.products[index] = product;
            fs.writeFile(this.path, JSON.stringify(this.products));
            return `Producto con id: ${id} fue editado correctamente.`
        }
        return {error: 'producto no encontrado'};
    }

    deleteProduct(id){
        const index = this.products.findIndex(element => element.id === id);
        if(this.products[index]){
            this.products.splice(index, 1);
            fs.writeFile(this.path, JSON.stringify(this.products));
            return `Producto con id: ${id} fue borrado correctamente.`
        }
        return {error: 'producto no encontrado'};
    }
}

module.exports=Producto;