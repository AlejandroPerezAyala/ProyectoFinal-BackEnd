import { Router } from "express";
import ProductManager from "../ProductManager.js";
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

router.post("/realtimeproducts", async(req, res) =>{
    const {title, code, price, description, stock, category} = req.body
    const producto = await productManager.addProduct(title,description,price,code,stock, category)
    producto ? res.send({status: producto}): res.status(400).send({error: "Te falto algun dato o el producto ya existe"});

    const productos = await productManager.getProducts()

    io.emit("newproduct", productos);
    

})

export default router