import { Schema, model } from "mongoose";

const cartCollection = "cart";

const cartSchema = new Schema(
    {
        products: {
            type: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "product",
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

cartSchema.pre("findOne", async function (next) {
    this.populate("products.product");
    next();
});

export const cartModel = model(cartCollection, cartSchema);