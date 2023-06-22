import ProductManager from "../dao/managers/ProductManagerMongo.js";

const productManager = new ProductManager();

export default class ProductService {
    insertManyProducts = async () => {
        return productManager.insertManyProducts();
    }

    getProducts = async (limit, page, sortValue) => {
        return productManager.getProducts(limit, page, sortValue);
    }

    getProductById =  async (pid) => {
        return productManager.getProductById(pid);
    }

    addProduct = async (title, description, price, code, stock, category) =>{
        return productManager.addProduct(title, description, price, code, stock, category);
    }

    updateProduct = async (pid, actualizacion) => {
        return productManager.updateProduct(pid, actualizacion);
    }

    deleteProduct = async (pid) => {
        return productManager.deleteProduct(pid);
    }
}