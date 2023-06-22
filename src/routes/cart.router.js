import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";

const cartsController = new CartsController();
const router = Router();

router.get("/", cartsController.getCarts)
router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCartById)
router.post("/:cid/products/:pid", cartsController.addProductInCart)
router.delete("/:cid/products/:pid", cartsController.deleteProductInCart)
router.delete("/:cid", cartsController.deleteAllProductsInCart)


export default router