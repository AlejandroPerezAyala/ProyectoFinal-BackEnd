import CartManager from "../dao/managers/cartManagerMongo.js";

const cartsManager = new CartManager();

export default class CartsService {
    createCart = async () => {
        return cartsManager.createCart();
    }

    addProductInCart = async (cid, pid) => {
        return cartsManager.addProductInCart(cid, pid);
    }

    deleteProductInCart = async (cid, pid) => {
        return cartsManager.deleteAllProductsInCart(cid, pid);
    }

    getCarts = async () => {
        return cartsManager.getCarts();
    }

    getCartById = async (cid) => {
        return cartsManager.getCartById(cid);
    }

    deleteAllProductsInCart = async (cid) =>{
        return cartsManager.deleteAllProductsInCart(cid);
    }
}