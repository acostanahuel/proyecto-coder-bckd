<<<<<<< HEAD
=======

import { productModel } from "../DB/models/product.model";

>>>>>>> 431739c3eb41fc3e1e2892e7e0df90d7a01c668c
export default class ProductService {
    getAll = async () => {
        let products = await productModel.find();

        return products.map(product => product.toObject());
    };

    save = async (product) =>{
        let result = await productModel.create(product);
        return result;
    };

    updateOne = async (prodId, product) =>{

        let updateProduct = await productModel.updateOne({_id: prodId}, product);
        return updateProduct;
    };

    getById = async (_id) =>{
        let getProdById = await productModel.findById(_id);
        return getProdById.toObject();
    };

    deleteOne = async (_id) =>{
        let deleteOne = await productModel.deleteOne(_id);
        return deleteOne;
    };
};
