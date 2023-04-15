import { Router } from "express";
import ProductManager from "../ProductManager.js";


const productManager = new ProductManager()
const router = Router();

router.get("/", async (req, res) => {
    const productos = await productManager.getProducts()

    res.render('index', 
        {
            style: 'index.css',
            productos
        });
})

export default router