//importamos FS
import fs from "fs"


//Creamos la clase con los metodos solicitados
export default class ProductManager{
    constructor(){
        this.productos = []
        this.path = "../files/productos.json"
    }

    //Validamos si el producto ya existe
    validarProducto = async (code) =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(data);

            if(productos.some(producto => producto.code == code)){
                return true
            } else {
                return false
            }
        }
    }

    //Agregamos el producto
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        if (fs.existsSync(this.path)) {
          // validamos si el producto existe
          let validacion = await this.validarProducto(code);

          if (validacion) {
            return "el producto ya existe";
          } else {

            //validamos que todos los datos se coloquen
            if(!title || !description || !price || !thumbnail || !code || !stock){
                return "Te falto colocar algun dato!"
            }

            //traemos los datos del JSON
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(data);

            //agregamos el producto
            const producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: productos.length + 1,
            };

            productos.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));

            return "el producto se añadio correctamente";

            }

        } else {// creamos el primer producto del JSON
          //validamos que todos los datos se coloquen
          if (!title ||!description ||!price ||!code ||!stock) {
            return "Te falto colocar algun dato!";
          }

          //agregamos el producto
          const producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: this.productos.length + 1,
          };

          this.productos.push(producto);

          await fs.promises.writeFile(this.path,JSON.stringify(this.productos, null, "\t"));

          return "el producto se añadio correctamente";
        }
        
        

    }

    //Mostramos la lista de productos
    getProducts = async () => {
        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(data);
            return productos
        } else {
            return [];
        }
    }

    //motramos el producto filtrado por ID
    getProductById = async(idProducto) => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(data);
            
            const producto = productos.find(producto => producto.id == idProducto)

            if(producto){
                return producto
            } else {
                return {error: "El producto con ese ID no existe"}
            }
        }
    }

    //Borramos un producto por ID
    deleteProductById = async (idProducto) => {
        
        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(data);
            
            const producto = productos.find(producto => producto.id == idProducto)
        
            if(producto){
                const indice = productos.indexOf(producto);
                productos.splice(indice, 1);

                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));

                return "El producto se elimino correctamente"
            } else {
                return "El producto con ese ID no existe"
            }
        }
    }

    //modificamos un producto por ID
    updateProduct = async (idProducto, campo, modificacion) => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(data);
            
            let producto = productos.find(producto => producto.id == idProducto)
        
            if(producto){
                producto[campo] = modificacion;
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
                return "El producto se actualizo correctamente"
            } else {
                return "El producto con ese ID no existe"
            }
        }
    }   
}

//creamos el Product Manager
//let product = new ProductManager();

//Pruebas solicitadas.

// let resultado = await product.getProducts();
// console.log(resultado);
// let producto = await product.addProduct("producto prueba", "producto de prueba", 200 ,"sin imagen", "abcd1234", 25);
// console.log(producto);
// resultado = await product.getProducts();
// console.log(resultado);
// let productoId = await product.getProductById(2);
// console.log(productoId);
// let productoEliminado = await product.deleteProductById(1)
// console.log(productoEliminado);
// resultado = await product.getProducts();
// console.log(resultado);
// let productoModificado = await product.updateProduct(2, "description", "Este es un producto modificado");
// console.log(productoModificado);
// resultado = await product.getProducts();
// console.log(resultado);




