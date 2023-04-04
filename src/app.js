import express from "express";
import ProductManager from "../src/ProductManager.js";

const PORT = 8080;
const productManager = new ProductManager();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto: ${PORT}`)})

app.get("/products", async (req, res) => {
    let limit = req.query.limit
    const productos = await productManager.getProducts();
    let productofiltrados = limit ? productos.slice(0,limit) : productos;
    res.send(productofiltrados);    
})

app.get("/products/:pid", async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid)
    res.send(producto);
})

