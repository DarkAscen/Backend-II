import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";
import { productDto } from "../dtos/product.dto.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authenticate, authorize } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", productManager.getProducts);

router.get("/:pid", productManager.getProductById);

router.post("/", authenticate("jwt"), authorize(["admin", "user"]), validate(productDto), productManager.addProduct);

router.put("/:pid", authenticate("jwt"), authorize(["admin", "user"]), productManager.updateProduct);

router.delete("/:pid", authenticate("jwt"), authorize(["admin", "user"]), productManager.deleteProduct);

export default router;