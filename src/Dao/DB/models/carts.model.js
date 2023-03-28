import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
        required: true
    }
});

cartSchema.pre('findById', function(){
    this.populate("products.product");
});


export const cartsModel = mongoose.model(cartCollection, cartSchema);