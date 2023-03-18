class ProductManager{
    constructor(){
        this.productos = []
    }

    validarProducto(code){
        let product = this.productos.find(producto => producto.code == code);

        if(product){
            return true
        } else {
            return false 
        }
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(this.validarProducto(code)){
            return "el producto ya existe"
        }

        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: this.productos.length + 1
        }

        this.productos.push(producto)
        return "el producto se añadio correctamente"

    }

    getProducts(){
        return this.productos
    }

    getProductById(idProducto){
        let producto = this.productos.find(producto => producto.id == idProducto)

        if(producto){
            return producto
        } else {
            return "No existe un producto con ese ID"
        }
    }
}

let product = new ProductManager();

console.log(product.getProducts());
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc123", 25));
console.log(product.getProducts());
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc123", 25));
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc1234", 25));
console.log(product.getProducts());
console.log(product.getProductById(1));
console.log(product.getProductById(5));
