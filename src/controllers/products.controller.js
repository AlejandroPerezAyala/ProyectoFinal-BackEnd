import ProductService from "../services/products.service.js";

const productService = new ProductService()

export default class ProductsController {
    insertManyProducts =  async (req, res) => {
        const result = await productManager.insertManyProducts()
        res.status(result.code).send({status: result.status, message: result.message})
    }


    getProducts = async (req, res) => {
        let {limit = 6, page = 1, sort = 1} = req.query;
        const productos = await productService.getProducts(limit,page, sort)
        res.status(productos.code).send({status: productos.status, message: productos.message});    
    }

    getProductById = async (req, res) => {
        const id = req.params.pid
        const producto = await productService.getProductById(id)
        res.status(producto.code).send({status: producto.status, message: producto.message})
    }

    addProduct = async (req, res) => {
        const {title, description, price, code, stock, category} = req.body
        const result = await productService.addProduct(title,description,price,code,stock,category);
        res.status(result.code).send({status:result.status, message: result.message})
    }

    updateProduct =  async (req, res) => {
        const id = req.params.pid
        const actualizacion = req.body
        const result = await productService.updateProduct(id, actualizacion);
        res.status(result.code).send({status: result.status, message: result.message});
    }

    deleteProduct = async (req, res) => {
        const id = req.params.pid
        const result = await productService.deleteProduct(id);
        res.status(result.code).send({status: result.status, message: result.message});
    }
}