import { Router } from 'express';
import ProductManager from '../Dao/filesystem/ProductManager.js';
import CartManager from "../Dao/filesystem/cartManager.js";
import { cartsModel } from "../Dao/DB/models/carts.model.js";
import { productModel } from "../Dao/DB/models/product.model.js";

const router = Router();
const productManager = new ProductManager();

// Show all products with FS?
router.get(`/`, async (req, res) => {
  const Products = await productManager.getProducts();
  res.render('home', { Products: Products });
});

router.get(`/realtimeproducts/`,async (req, res) => {
  res.render('realTimeProducts');
});

export default router;
