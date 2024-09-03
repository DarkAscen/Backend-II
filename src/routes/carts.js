import { Router } from "express";
import { cartManager } from "../managers/CartManager.js";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";

const router = Router();

router.get("/:cid", cartManager.getCarts);

router.post("/", cartManager.addCart);

router.post("/:cid/product/:pid", validate(cartDto), cartManager.addProductToCart);

router.put("/:cid", cartManager.updateCartProducts);

router.put("/:cid/product/:pid", cartManager.updateProductQuantity);

router.delete("/:cid", cartManager.deleteProductsFromCart);

router.delete("/:cid/product/:pid", cartManager.deleteProductFromCart);

router.post(":cid/purchase", cartManager.purchaseCart);

export default router;