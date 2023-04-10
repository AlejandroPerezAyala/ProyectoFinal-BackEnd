import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager();
const router = Router()

router.get("/", async (req, res) => {
    let limit = req.query.limit
    const productos = await productManager.getProducts();
    let productofiltrados = limit ? productos.slice(0,limit) : productos;
    res.send(productofiltrados);    
})

router.get("/:pid", async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid)
    res.send(producto);
})

router.post("/", async (req, res) => {
    const {title, description, price, thumbnail, code, stock, category} = req.body
    const producto = await productManager.addProduct(title,description,price,thumbnail,code,stock, category)
    res.send({
        status: producto
    })
})

router.put("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid)
    const actualizacion = req.body
    
    const producto = await productManager.updateProduct(pid, actualizacion);
    res.send({
        status: producto
    })
})

router.delete("/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid)
    const producto = await productManager.deleteProductById(pid)
    res.send({
        status: producto
    })
})

export default router