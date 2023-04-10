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
    res.send(cart);
})

router.post("/:cid/products/:pid", async (req, res) => {
    const productCart = await cartManager.addProductInCart(req.params.cid, req.params.pid);
    res.send({
        status: productCart
    })
} )


export default router