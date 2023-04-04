import express from "express";
import __dirname from "./util.js";
import { Server } from "socket.io";
import session from "express-session";
import handlebars from "express-handlebars";
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
import ViewsRouter from "./routes/views.router.js";
import ProductManager from "./Dao/filesystem/ProductManager.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersViewRouter from './routes/user.view.router.js';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { mongoDB_URL } from "./setting.js";
import cookieParser from "cookie-parser";


const app = express();
const productManager = new ProductManager();
// productManager.getProducts();

// handlebars use
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');
// JSON encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use("/api/session", sessionsRouter);
app.use ('/users', usersViewRouter); //simplemente una vista renderiza informacion 
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(session({
  store: MongoStore.create({
      mongoUrl: mongoDB_URL,
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
      ttl: 30
  }),
  secret: "n4hu3l",
  resave: false,
  saveUninitialized: true
}));


const hdbs = handlebars.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  allowProtoMethodsByDefault: true // aquí se agrega la propiedad
});

// Routers
app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);
app.use(`/api/views`, ViewsRouter);



const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  console.log(__dirname);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log('new user conected:', socket.id);

  socket.on('client:message', msg => { console.log(msg); });- 

  socket.on('client:products', async ()=> {
    const Products =  await productManager.getProducts();
    socket.emit('server:products', Products);
  });
});


const connectMongoDB = async ()=>{
  try {
      await mongoose.connect(mongoDB_URL); //DB products en MONGO ATLAS
      console.log("Conectado con exito a MongoDB usando Moongose.");
  } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
  }
};
connectMongoDB();

