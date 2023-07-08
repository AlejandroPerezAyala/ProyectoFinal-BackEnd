import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";

const cartsController = new CartsController();
const router = Router();

const userAccess = (req,res,next) => {
    if(req.session.user && req.session.user.rol == "user"){
        next()
    } else {
        res.send("solo el user puede hacer esto")
    }
}

router.get("/", cartsController.getCarts)
router.post("/", cartsController.createCart)
router.get("/:cid", cartsController.getCartById)
router.post("/:cid/products/:pid", userAccess,cartsController.addProductInCart)
router.delete("/:cid/products/:pid", cartsController.deleteProductInCart)
router.delete("/:cid", cartsController.deleteAllProductsInCart)
router.get("/:cid/purchase", userAccess,cartsController.purchaseCart)


export default router