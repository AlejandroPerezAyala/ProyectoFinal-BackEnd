import ticketModel from "../models/ticket.model.js";
import cartModel from "../models/carts.model.js";
import userModel from "../models/user.model.js";

export default class TicketManager{
    constructor(){
        this.model = ticketModel;
    }

    purchaseCart = async (cid) => {
        const cart = await cartModel.findById(cid).populate("productos.producto");
        let totalAmount = 0;
        const productsWithStock = [];
        for (const productInCart of cart.productos) {
            const product = productInCart.producto;
            if (productInCart.qty <= product.stock) {
                product.stock -= productInCart.qty;
                await product.save();
                totalAmount += product.price * productInCart.qty;
            } else if (product.stock == 0){
                totalAmount += product.price * product.stock;
                productsWithStock.push(productInCart);
                //product.stock -= productInCart.qty;
                await product.save();
            };
        };
        const generateCode = Math.floor(Math.random() * 10000);
        const generateDate = new Date().toLocaleString();
        const user = await userModel.findOne({ cart: cid });
        const purchaserEmail = user.email;
        const ticketData = {
            code: generateCode,
            purchase_datetime: generateDate,
            amount: totalAmount,
            purchaser: purchaserEmail
        };
        const ticket = await this.model.create(ticketData);
        cart.productos = productsWithStock;
        await cart.save();
        return ticket;
    }
}