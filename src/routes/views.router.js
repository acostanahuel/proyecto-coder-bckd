import { Router } from 'express';
import ProductManager from '../Dao/filesystem/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

// Show all products
router.get(`/`, async (req, res) => {
  const Products = await productManager.getProducts();
  res.render('home', { Products: Products });
});

router.get(`/realtimeproducts/`,async (req, res) => {
  res.render('realTimeProducts');
});

export default router;
