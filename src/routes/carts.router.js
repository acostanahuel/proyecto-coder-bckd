import { Router } from "express";
import CartManager from "../Dao/filesystem/cartManager.js";
import ProductManager from "../Dao/filesystem/ProductManager.js";
import { cartsModel } from "../models/carts.model.js";
import { productModel } from "../models/product.model.js";
import ProductService from "../Dao/services/products.service.js";
import CartService from "../Dao/services/cart.service.js";


const router = Router();
// const cartManager = new CartManager();
// const productManager = new ProductManager();
const cartService = new CartService();
const productService = new ProductService();

// //ANDA//
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
    try{
        let result = await cartService.save(request.body);
        response.status(201).send(result);
    } catch(error){
        console.log("Error al guardar el carrito. Error: " + error); 
        response.status(500).send({error: "Error al guardar el carrito", message: error});
    }
});

router.get("/:cartId", async (request, response) =>{
    try{
        const cartById = await cartService.getById({_id: request.params.cartId});
        response.send(cartById);
        console.log(cartById);
    } catch(error){
        response.status(400).send({error: "Error al consultar por ID", message: error});
    }  
})

router.post("/:cartId/product/:prodId", async (request, response) =>{
    try{
        const cartId = request.params.cartId;
        const prodId = request.params.prodId;

        let cartUpdate = await cartService.addProduct(cartId, prodId);
        console.log(cartUpdate)
        response.status(200).send(cartUpdate);

    }catch(error){
        console.log(error)
        response.status(500).send({error: "Error al agregar al carrito", message: error})
    }
});

router.delete("/:cartId/product/:prodId", async (request, response) =>{
    try{
        let cartId = request.params.cartId;
        let prodId = request.params.prodId;

        let deleteProd = await cartService.deleteProduct(cartId, prodId)
        response.status(200).send(deleteProd);
    }catch(error){
        console.log(error);
        response.status(500).send({error: "No se pudo eliminar el producto", message: error})
    }
});

router.delete("/:cartId", async (request, response) =>{
    try{
        const cartId = request.params.cartId;

        const deleteAllProducts = await cartService.deleteAllProducts(cartId)
        response.status(200).send(deleteAllProducts);
    }catch(error){
        console.log(error);
        response.status(500).send({error: "Error al eliminar los productos", message: error});
    }
});

router.put("/:cartId", async (request, response) =>{
    try{
        const cartId = request.params.cartId;
        let newProd = request.body;

        let updateCart = await cartService.updateCart(cartId, newProd)

        response.status(200).send(updateCart)
    }catch(error){
        consolr.log(error);
        response.status(500).send({error: "Error al actualizar el carrito", message: error});
    }
});

router.put("/:cartId/product/:prodId", async (request, response) =>{
    try{
        const cartId = request.params.cartId;
        const prodId = request.params.prodId;
        const quantity = request.body.quantity;

        let updateQuantity = await cartService.updateQuantity(cartId, prodId, quantity);
        response.status(200).send(updateQuantity);
    }catch(error){
        console.log(error);
        response.status(500).send({error: "No se pudo actualizar la cantidad de los productos", message: error})
    } 
});


export default router;
