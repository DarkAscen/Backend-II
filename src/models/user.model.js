import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/hashpass.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "cart",
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"],
    }
});

userSchema.pre("save", function (next) {
    if (this.email.includes("@") && this.email.includes(".")) {
        return next();
    }

    next(new Error("El email no es válido"));
});

userSchema.pre("save", async function (next) {
    const newPassword = await hashPassword(this.password);

    this.password = newPassword;

    next();
});

export const userModel = model("user", userSchema);