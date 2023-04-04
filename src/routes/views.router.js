import { Router } from 'express';
import ProductManager from '../Dao/filesystem/ProductManager.js';
import CartManager from "../Dao/filesystem/cartManager.js";
import { cartsModel } from "../Dao/DB/models/carts.model.js";
import { productModel } from "../Dao/DB/models/product.model.js";
import cookieParser from 'cookie-parser';
import mongoosePaginate from 'mongoose-paginate-v2';
import handlebarsPaginate from 'handlebars-paginate';

const router = Router();
const productManager = new ProductManager();

//cookie
router.use(cookieParser('n4hu3l'));

// Show all products with FSystem
router.get(`/`, async (req, res) => {
  const Products = await productManager.getProducts();
  res.render('home', { Products: Products });
});

router.get(`/realtimeproducts/`,async (req, res) => {
  res.render('realTimeProducts');
});

router.get ("/products", async (req, res) =>{

  try {
      let {category, limit, page, sort} = req.query;
      let resultProducts = {};

      let prod = await productModel.paginate({}, {limit: (limit ? limit: 10), page: (page ? page: 2), sort: (sort ? sort: {price:1})})

      resultProducts = {
          status: "succcess",
          payload: prod.docs,
          totalPages: prod.totalPages,
          prevPage: prod.prevPage,
          nextPage: prod.nextPage,
          page: prod.page,
          hasPrevPage: prod.hasPrevPage,
          hasNextPage: prod.hasNextPage,
          prevLink: prod.hasPrevPage != false  ? `http://localhost:8080/api/views/products?limit=${(limit ? limit : 10)}&page=${parseInt((page ? page : 1))-1}&sort=${(sort ? sort: {price:1})}` : null ,
          nextLink: prod.hasNextPage != false  ? `http://localhost:8080/api/views/products?limit=${(limit ? limit : 10)}&page=${parseInt((page ? page : 1))+1}&sort=${(sort ? sort: {price:1})}` : null ,
  }
  res.render('products', {resultProducts});
  // response.send(prod);
  console.log(resultProducts);
} catch(error){
  console.log(error)
  res.status(500).send({error: "Error al consultar los productos", message: error});
}
});


export default router;
