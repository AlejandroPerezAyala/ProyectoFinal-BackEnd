import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";
import {io} from "../app.js"



const productManager = new ProductManager()
const router = Router();

router.get("/", async (req, res) => {
    const productos = await productManager.getProducts()

    res.render('home', 
        {
            style: 'index.css',
            productos
        });
})

router.get("/realtimeproducts", async (req, res) => {
    const productos = await productManager.getProducts()
    res.render('realTimeProducts', 
    {
        style: 'index.css',
        productos
    });
    
})

router.post("/realtimeproducts", async (req, res) =>{
    const {title, code, price, description, stock, category, thumbnail} = req.body
    const producto = await productManager.addProduct(title,description,price, thumbnail, code,stock,category)
    producto ? res.send({status: producto}): res.status(400).send({error: "Te falto algun dato o el producto ya existe"});

    const productos = await productManager.getProducts()

    io.emit("newproduct", productos);

})

router.delete("/realtimeproducts/:pid", async (req, res) => {
    let pid = req.params.pid
    const producto = await productManager.deleteProductById(pid)
    producto ? res.send({status: producto}) : res.status(400).send({error: "No existe el ID en los productos"})

    const productos = await productManager.getProducts()

    io.emit("productdelete", productos);
    
})
export default router