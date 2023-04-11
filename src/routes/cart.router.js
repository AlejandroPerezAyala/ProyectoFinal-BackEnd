import { Router } from "express";
import CartManager from "../CartManager.js";

const cartManager = new CartManager()
const router = Router()

router.post("/", async (req, res) => {
    const {title} = req.body
    const cart = await cartManager.addCart(title);
    res.send({
        status: cart
    })
})

router.get("/:cid", async (req,res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    cart ? res.send(cart) : res.status(400).send({error: "El ID del carrito no existe"})
})

router.post("/:cid/products/:pid", async (req, res) => {
    const productCart = await cartManager.addProductInCart(req.params.cid, req.params.pid);
    productCart ? res.send(productCart) : res.status(400).send({error: "El ID del carrito o del producto no existe"})
} )


export default router