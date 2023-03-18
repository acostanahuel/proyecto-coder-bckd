import { Router } from "express";
import CartManager from "../Dao/filesystem/cartManager.js";
import ProductManager from "../Dao/filesystem/ProductManager.js";
import { cartsModel } from "../Dao/DB/models/carts.model.js";
import { productModel } from "../Dao/DB/models/product.model.js";


const router = Router();
// const cartManager = new CartManager();
// const productManager = new ProductManager();

//ANDA//
// router.post("/", async (request, response) =>{
//    let newProduct = await cartManager.addCart();
//    response.send("Cart created with success");
// });

// router.get("/:cartId", async (request, response) =>{
//     const cart = await cartManager.getCart();
//     const cartId = cart.find(c => c.id == request.params.cartId);
//     if(cartId){
//         response.send(JSON.stringify(cartId));
//     }else{
//         response.status(400).send({error: "400", message: "El id ingresado es inválido o no existe"});
//     }
// })

// router.post (`/:cid/product/:pid` , async (request, response) =>{
// const cid= parseInt(request.params.cid);
// const pid= parseInt(request.params.pid);
// const product= await productManager.getProductById(pid);
// const cart= await cartManager.getCartById(cid);

// await cartManager.cartBuilder(cart, product);

//   response.status(200).json(cart);

// });

///MONGOOSE
router.post("/", async (request, response) =>{
   let newProduct = await cartsModel.create();
   response.send("Cart created with success");
});



router.get("/:cartId", async (request, response) =>{
    const cart = await cartsModel.find();
    const cartId = cart.find(c => c.id == request.params.cartId);
    if(cartId){
        response.send(JSON.stringify(cartId));
    }else{
        response.status(400).send({error: "400", message: "El id ingresado es inválido o no existe"});
    }
})


router.post (`/:cid/product/:pid` , async (request, response) =>{
const cid= parseInt(request.params.cid);
const pid= parseInt(request.params.pid);
const product= await productModel.getProductById(pid);
const cart= await cartsModel.getCartById(cid);

await cartsModel.cartBuilder(cart, product);

  response.status(200).json(cart);

});

export default router;
