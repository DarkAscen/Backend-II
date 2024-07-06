import { Schema, model } from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        default: [],
    },
});

export const cartModel = model(cartCollection, cartSchema);