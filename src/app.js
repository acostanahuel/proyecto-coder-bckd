import express from "express";
import __dirname from "./util.js";
import { Server } from "socket.io";
import session from "express-session";
import handlebars from "express-handlebars";
//import MongoSingleton from './config/mongodb-singleton.js'
import config from "./config/config.js";


///Routers
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
import ProductManager from "./Dao/filesystem/ProductManager.js";
import ViewsRouter from "./routes/views.router.js";
import UsersViewRouter from "./routes/users.views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import githubLoginViewRouter from "./routes/github-login.views.router.js";
import userRouter from "./routes/user.router.js";

///mongo
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import { mongoDB_URL } from "./config/setting.js";

//cookie
import cookieParser from "cookie-parser";

//passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";


const app = express();
const productManager = new ProductManager();


// JSON encode para poder recibir JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// handlebars use
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');


//public folder
app.use(express.static(__dirname + '/public'));
//cookie
app.use(cookieParser('n4hu3l'));

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

//middlewares passport
initializePassport();
app.use(passport.initialize());
app.use (passport.session());


// Routers
app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);
app.use(`/api/views`, ViewsRouter);
app.use (`/users`, UsersViewRouter); ///solo rendereiza info por eso va sin api
app.use (`/api/sessions`, sessionsRouter);
app.use ('/github', githubLoginViewRouter);
app.use('/api/user', userRouter); //maneja las cosas respectivas al user


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

const SERVER_PORT = config.port;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  //DotEnv
  console.log(config);
 
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



