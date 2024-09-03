import { productModel } from "../models/product.model.js";

class ProductService {
    static async getProducts(req, res){
        return await productModel.find();
    }

    static async getProductById(req, res){
        return await productModel.findById(req.params.pid);
    }

    static async addProduct(req, res){
        return await productModel.create(req.body);
    }

    static async updateProduct(req, res){
        return await productModel.findByIdAndUpdate(req.params.pid, req.body);
    }

    static async deleteProduct(req, res){
        return await productModel.findByIdAndDelete(req.params.pid);
    }

    static async updateProductStock(req, res){
        return await productModel.updateOne(
            {
                _id: id,
            },
            {
                $inc: {
                    stock: -quantity,
                },
            }
        );
    }
}

export const productService = new ProductService();