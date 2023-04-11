//importamos FS
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, "../files/productos.json")

const thumbnailURL = "http://localhost:8080/images/" 
//Creamos la clase con los metodos solicitados
export default class ProductManager{
    constructor(){
        this.productos = []
        this.path = filePath
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
    addProduct = async (title, description, price, thumbnail, code, stock, category) => {
        if (fs.existsSync(this.path)) {
          // validamos si el producto existe
          let validacion = await this.validarProducto(code);

          if (validacion) {
            return null;
          } else {

            //validamos que todos los datos se coloquen
            if(!title || !description || !price || !code || !stock){
                return null
            }

            //traemos los datos del JSON
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(data);

            //agregamos el producto
            const producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnailURL,
            status: true,
            category: category,
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
            return null;
          }

          //agregamos el producto
          const producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnailURL,
            status: true,
            category: category,
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
                return null
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
                return null
            }
        }
    }

    //modificamos un producto por ID
    updateProduct = async (idProducto, modificacion) => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const productos = JSON.parse(data);
            
            //obtengo el producto con el ID solicitado
            let producto = productos.find(producto => producto.id == idProducto)

            //obtengo las keys del objeto con los values que queremos modificar del producto obtenido por el ID
            let keysProducto = Object.keys(modificacion);

            //Si el ID del producto no existe devuelvo un error 
            if(!producto){
                return null
            }
            
            //itero con el "for of" las claves obtenidas
            for (const key of keysProducto){

                //si el producto a modificar tiene la/las keys a modificar le asigno los valores nuevos del objeto que le pasamos por parametro
                if(producto.hasOwnProperty(key)){
                    producto[key] = modificacion[key]
                }
            }

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
            return "El producto se actualizo correctamente"
           
        }
    }   
}

