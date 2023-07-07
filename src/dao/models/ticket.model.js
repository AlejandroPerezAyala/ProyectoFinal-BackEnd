import mongoose from "mongoose";

const collection = "tickets"

const schema = new mongoose.Schema({
    code: String,
    purchase_datetime: new Date().toLocaleString(),
    amount: Number,
    purchaser: String
})

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;