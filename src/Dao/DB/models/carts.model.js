import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
        required: true
    }
});

export const cartsModel = mongoose.model(cartCollection, cartSchema);