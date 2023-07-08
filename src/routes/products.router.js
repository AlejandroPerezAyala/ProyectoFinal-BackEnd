import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

const productsController = new ProductsController(); 
const router = Router()

const adminAccess = (req,res,next) => {
    if(req.session.user && req.session.user.rol == "admin"){
        next()
    } else {
        res.send("que haces aca? volve cuando seas administrador")
    }
}


router.get("/insertion", adminAccess,productsController.insertManyProducts)
router.get("/",productsController.getProducts)
router.get("/:pid",productsController.getProductById)
router.post("/", adminAccess,productsController.addProduct)
router.put("/:pid", adminAccess,productsController.updateProduct)
router.delete("/:pid", adminAccess,productsController.deleteProduct)

export default router