//Creamos la clase con los metodos solicitados
class ProductManager{
    constructor(){
        this.productos = []
    }

    //Validamos si el producto ya existe
    validarProducto(code){
        let product = this.productos.find(producto => producto.code == code);

        if(product){
            return true
        } else {
            return false 
        }
    }

    //Agregamos el producto
    addProduct(title, description, price, thumbnail, code, stock){

        //validamos si el producto existe
        if(this.validarProducto(code)){
            return "el producto ya existe"
        }

        //validamos que todos los datos se coloquen
        if(!title | !description | !price | !thumbnail | !code | !stock){
            return "Te falto colocar algun dato!"
        }

        //agregamos el producto
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

    //Mostramos la lista de productos
    getProducts(){
        return this.productos
    }

    //motramos el producto filtrado por ID
    getProductById(idProducto){
        let producto = this.productos.find(producto => producto.id == idProducto)

        if(producto){
            return producto
        } else {
            return "No existe un producto con ese ID"
        }
    }
}

//creamos el Product Manager
let product = new ProductManager();

//Pruebas solicitadas.
console.log(product.getProducts());
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc123", 25));
console.log(product.getProducts());
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc123", 25));
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc1234"));
console.log(product.addProduct("producto prueba", "producto de prueba", 200, "sin imagen", "abc1234", 25));
console.log(product.getProducts());
console.log(product.getProductById(1));
console.log(product.getProductById(5));

