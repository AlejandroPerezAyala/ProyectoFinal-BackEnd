import express from "express";
import productsRouter from "./routes/products.router.js"


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto: ${PORT}`)})

app.use("/products", productsRouter);



