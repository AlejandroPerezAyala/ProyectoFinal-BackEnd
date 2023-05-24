import express from "express";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import sessionRouter from "./routes/session.router.js"
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";


const PORT = 8080;
const MONGO = "mongodb+srv://perezalejandro266:155481Ale@database-proyectocoderb.84cvxnw.mongodb.net/?retryWrites=true&w=majority"

const app = express();


const enviroment = async () => {
   await mongoose.connect(MONGO);
} 

enviroment();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl: 3600
    }),
    secret: "CoderSecret",
    resave:false,
    saveUninitialized:false

}))

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

const server = app.listen(PORT, () => {console.log(`Servidor escuchando en el puerto: ${PORT}`)})

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/session", sessionRouter);


export const io = new Server(server);


io.on("connection", socket => {
    console.log("usuario conectado");
})


