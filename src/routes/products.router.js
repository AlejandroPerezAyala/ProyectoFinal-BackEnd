import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import ProductManager from "../dao/managers/ProductManager.js";


const productManager = new ProductManager();
const router = Router()
const thumbnailURL = "http://localhost:8080/images/"

const products = [
    {
        "title": "Zapatillas Nike Air Force 1",
        "description": "Las icónicas zapatillas Nike Air Force 1 son un clásico que nunca pasa de moda. Cuentan con una parte superior de piel y una suela de goma resistente para una mayor durabilidad y tracción.",
        "price": 18999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "NKAF1-BL",
        "stock": 10,
        "category": "Nike"
    },
    {
        "title": "Zapatillas Nike Air Max 270",
        "description": "Las zapatillas Nike Air Max 270 son ideales para correr gracias a su amortiguación y comodidad. Cuentan con una parte superior de malla y una suela de goma para una mayor durabilidad y tracción.",
        "price": 21999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "NKAM270-BL",
        "stock": 8,
        "category": "Nike"
    },
    {
        "title": "Zapatillas Nike React Infinity Run Flyknit",
        "description": "Las zapatillas Nike React Infinity Run Flyknit son ideales para correr largas distancias gracias a su comodidad y amortiguación. Cuentan con una parte superior de tejido Flyknit y una suela de goma para una mayor durabilidad y tracción.",
        "price": 24999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "NKREACT-BL",
        "stock": 5,
        "category": "Nike"
    },
    {
        "title": "Zapatillas Adidas Superstar",
        "description": "Las zapatillas Adidas Superstar son un clásico de los años 80 que sigue siendo popular hoy en día. Cuentan con una parte superior de piel y una suela de goma para una mayor durabilidad y tracción.",
        "price": 15999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "ADSSUP-BL",
        "stock": 12,
        "category": "Adidas"
    },
    {
        "title": "Zapatillas Adidas Ultraboost 21",
        "description": "Las zapatillas Adidas Ultraboost 21 son ideales para correr gracias a su comodidad y amortiguación. Cuentan con una parte superior de tejido Primeknit y una suela de goma para una mayor durabilidad y tracción.",
        "price": 21999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "ADSULT-BL",
        "stock": 7,
        "category": "Adidas"
    },
    {
        "title": "Zapatillas Adidas Stan Smith",
        "description": "Las zapatillas Adidas Stan Smith son un clásico que nunca pasa de moda. Cuentan con una parte superior de piel y una suela de goma para una mayor durabilidad y tracción.",
        "price": 14999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "ADSSTAN-BL",
        "stock": 15,
        "category": "Adidas"
    },
    {
        "title": "Zapatillas DC Pure",
        "description": "Las zapatillas DC Pure son ideales para patinadores que buscan una zapatilla con un gran agarre y durabilidad. Cuentan con una parte superior de piel y una suela de goma resistente a la abrasión para una mayor durabilidad.",
        "price": 9999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "DCPURE-BL",
        "stock": 20,
        "category": "DC"
    },
    {
        "title": "Zapatillas DC Kalis Vulc",
        "description": "Las zapatillas DC Kalis Vulc son ideales para patinadores que buscan una zapatilla con un gran agarre y durabilidad. Cuentan con una parte superior de ante y una suela de goma resistente a la abrasión para una mayor durabilidad.",
        "price": 11999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "DCKALIS-BL",
        "stock": 13,
        "category": "DC"
    },
    {
        "title": "Zapatillas DC Trase TX",
        "description": "Las zapatillas DC Trase TX son ideales para patinadores que buscan una zapatilla cómoda y duradera. Cuentan con una parte superior de lona y una suela de goma resistente a la abrasión para una mayor durabilidad.",
        "price": 7999.99,
        "thumbnail": "http://localhost:8080/images/",
        "status": true,
        "code": "DCTRASE-BL",
        "stock": 18,
        "category": "DC"
    }
]

router.get("/insertion", async (req, res) => {
    const result = await productModel.insertMany(products);
    res.send({result});
})

router.get("/", async (req, res) => {
    let limit = req.query.limit
    const productos = await productModel.find();
    let productosfiltrados = limit ? productos.slice(0,limit) : productos;
    res.send({Productos: productosfiltrados});    
})

router.get("/:pid", async (req, res) => {
    const id = req.params.pid
    const producto = await productModel.findOne({_id:id})
    if(producto){
        res.send({status: producto});
    } else {
        res.status(400).send({error: "no hay ningun producto con ese ID"})
    }
    
})

router.post("/", async (req, res) => {
    const {title, description, price, code, stock, category} = req.body

    const producto = {
        title,
        description,
        price,
        thumbnail: thumbnailURL,
        status: true,
        code,
        stock,
        category 
    }

    if(!title || !description || !price || !code || !stock || !category ){
        return res.status(400).send({error: "Te falto algun dato o el producto ya existe"})
    }
    
    const result = productModel.create(producto)

    res.send({result});
    
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const actualizacion = req.body
    
    const producto = await productModel.updateOne({_id:id},{$set:actualizacion});
    producto ? res.send({status: producto}) : res.status(400).send({error: "No existe el ID en los productos"})
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const producto = await productModel.deleteOne({_id:id})
    producto ? res.send({status: producto}) : res.status(400).send({error: "No existe el ID en los productos"})
})

export default router