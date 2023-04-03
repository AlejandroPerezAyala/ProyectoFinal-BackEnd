import express from "express";
import ProductManager from "../src/ProductManager.js";

const PORT = 8080;
const productManager = new ProductManager();
const app = express();

app.use(express.urlencoded({extended:true}))
app.listen(PORT, () => {`Servidor escuchando en el puerto: ${PORT}`})

app.get("/products", async (req, res) => {
    let limit = req.query.limit
    if(!limit){
        const productos = await productManager.getProducts()
        return res.send(productos);
    } else {
        const productos = await productManager.getProducts()
        const productLimitados = productos.slice(0,limit)
        return res.send(productLimitados);
    }
    
})

app.get("/products/:pid", async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid)
    res.send(producto);
})

