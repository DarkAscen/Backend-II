import { Schema, model } from "mongoose";
import moongoosePaginate from "mongoose-paginate-v2";

const productCollection = "product";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true,
    }
);

productSchema.plugin(moongoosePaginate);

export const productModel = model(productCollection, productSchema);