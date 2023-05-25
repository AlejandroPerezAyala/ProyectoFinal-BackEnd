import { Router } from "express";
import ProductManager from "../dao/managers/ProductManager.js";
import productModel from "../dao/models/products.model.js";
import CartManager from "../dao/managers/cartManagerMongo.js";
import {io} from "../app.js"



const productManager = new ProductManager()
const cartManager = new CartManager()
const router = Router();

router.get("/", async (req, res) => {
    const {page = 1, limit=4 , sort} = req.query;
    const user = req.session.user;
    console.log(user);
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage} = await productModel.paginate({},{page,limit, sort: {price: sort},lean:true});
    const productos = docs;
    res.render('home', 
        {
            style: 'index.css',
            user,
            productos,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            limit,
            sort
        });
})

router.get("/realtimeproducts", async (req, res) => {
    const productos = await productModel.find().lean();
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

router.get("/cart/:cid", async (req, res) => {
    const id = req.params.cid;

    const carts = await cartManager.getCartById(id);
    const cart = carts.message;
    const productos = cart.productos


    console.log(productos)

    res.render("cart", {
        productos
    })
    

}) 

router.get("/register", (req,res) => {
    res.render('register')
})

router.get("/login", (req,res) => {
    res.render("login")
})


    
export default router