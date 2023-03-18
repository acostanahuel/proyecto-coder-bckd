import {Router} from "express"
import ProductManager from "../Dao/filesystem/ProductManager.js";
import { productModel } from "../Dao/DB/models/product.model.js";
import send from "send";




const router = Router();
// const productManager = new ProductManager ();



// //1 listado de productos//
// router.get(`/`, async (req, res) => { productManager.getProducts(); res.send(productManager.products); });

// // 2 producto por id//
// let getProductByID = [];

// router.get(`/:pid`, async (req, res) => {
//   let id = parseInt(req.params.pid);
//   productManager.getProductById(id);
//   id <= productManager.products.length ? res.send(productManager.products[id]) : res.send(productManager.products);
// });

// //con limit
// router.get(`/limit/:query`, async (req, res) => {
//   await productManager.getProducts()
//   let limit = (parseInt(req.query.limit) - 1);
//   let productLimit = []
//   if (limit <= productManager.products.length) {
//     for (let i = 0; i <= limit; i++) { productLimit.push(productManager.products[i]) }
//     res.send(productLimit)
//   } else { res.send(productManager.products) }
// });

// ///update product //
// router.post("/", async (request, response) =>{
//   const newProd = request.body;
//   try{
//       await productManager.addProduct(newProd.title,newProd.description, newProd.price, newProd.thumbnail, newProd.stock, newProd.category, newProd.status)
//       response.status(201).send({message: "Producto incorporado con éxito!"});
//   } catch(error){
//       console.log("Error al guardar el producto. Error: " + error); 
//       response.status(500).send({error: "Error al guardar el producto", message: error});
//   }
// });


// router.put(`/:pid`, async (req, res) => {
//   const id = (parseInt(req.params.pid))
//   const newProduct = req.body;
//   productManager.updateProduct(id, newProduct)
//   res.send(productManager.products[id])
// });

// router.delete(`/:pid`, async (req, res) => {
//   const id = (parseInt(req.params.pid))
//   console.log(id)
//   productManager.deleteProduct(id)
//   res.send(`Product whit ID: ${id} was deleted`)
// });




 //USANDO MONGOOSE//

router.get("/", async (req, res)=> { 
  try {
      let products = await productModel.find(); 
      console.log(products);
      res.send(products);
  } catch (error) {
      console.error("No se pudo obtener productos con moongose: " + error);
      res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
  }
});

router.post("/", async (req, res)=> { //Debe ser async para poder trabajar con mongoose.
  try {
      let {title, description, price,thumbnail,stock,category} = req.body;
      let product = await productModel.create({title, description, price,thumbnail,stock,category}); //Es async
      res.send({result: "success", payload: product});
  } catch (error) {
      console.error("No se pudo obtener productos con moongose: " + error);
      res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
  }
});

router.put ("/:pid", async (req, res ) =>{
try {
  let productUpdated = req.body;
  let product = await productModel.updateOne ({_id: req.params.pid}, productUpdated);
  res.status(202).send(product);
} catch (error) {
  console.error("No se pudo obtener productos con moongose: " + error);
  res.status(500).send({error: "No se pudo obtener productos con moongose", message: error});
}
  
});

router.delete(`/:pid`, async (req, res) => {
let {pid} = req.params;
let result = await productModel.deleteOne({_id:pid});
res.send({status:"succes", payload:result});
});

export default router;
