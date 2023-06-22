import CartsService from "../services/cart.service.js";

const cartsService = new CartsService();

export default class CartsController {
    createCart = async (req, res) => {
        const cart = await cartsService.createCart()
        res.status(cart.code).send({status: cart.status, message: cart.message})
    }

    getCarts =  async (req,res) => {
        const cart = await cartsService.getCarts();
        res.status(cart.code).send({status: cart.status, message: cart.message});
    }

    getCartById =  async (req,res) => {
        const id = req.params.cid
        const cart = await cartsService.getCartById(id);
        res.status(cart.code).send({status: cart.status, message: cart.message});
    }

    deleteProductInCart = async (req,res) => {
        const cid = req.params.cid;
        const pid = req.params.pid
        const result = await cartsService.deleteProductInCart(cid,pid);
        res.status(result.code).send({status: result.status, message: result.message});
    }

    addProductInCart = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const productCart = await cartsService.addProductInCart(cid,pid);
        res.status(productCart.code).send({status: productCart.status, message: productCart.message})
    }

    deleteAllProductsInCart =  async (req,res) => {
        const id = req.params.cid;
        const result = await cartsService.deleteAllProductsInCart(id);
        res.status(result.code).send({status: result.status, message: result.message})
    }
}