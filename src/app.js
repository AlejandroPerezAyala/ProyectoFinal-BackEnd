import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

const server = app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto: ${PORT}`)})

app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter)


export const io = new Server(server);


io.on("connection", socket => {
    console.log("usuario conectado");
})
