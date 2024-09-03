import { cartModel } from "../models/cart.model.js";

class CartService {
    static async getCarts(req, res){
        return await cartModel.find();
    }

    static async getCartById(req, res){
        return await cartModel.findById(req.params.cid);
    }

    static async addCart(req, res){
        return await cartModel.create(req.body);
    }

    static async updateCartProducts(req, res){
        return await cartModel.findByIdAndUpdate(req.params.cid, req.body);
    }

    static async deleteCart(req, res){
        return await cartModel.findByIdAndDelete(req.params.cid);
    }

    static async deleteProductFromCart(req, res){
        return await cartModel.updateOne(
            {
                _id: id,
            },
            {
                $pull: {
                    products: {
                        product: productId,
                    },
                },
            });
    }

    static async addProductToCart(req, res){
        return await cartModel.updateOne(
            {
                _id: id,
            },
            {
                $push: {
                    products: {
                        product: productId,
                        quantity: quantity,
                    },
                },
            });
    }
};