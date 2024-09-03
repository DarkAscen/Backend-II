import { authenticate, authorize } from "../middlewares/authorization.middleware.js";
import { Router } from "express";
import userRouter from "./user.routes.js";
import sessionRouter from "./session.routes.js";
import cartRouter from "./carts.js";
import productRouter from "./products.js";

const router = Router();

router.use("/user", authenticate("jwt"), authorize(["admin", "user"]), userRouter);
router.use("/auth", sessionRouter)
router.use("/cart", authenticate("jwt"), authorize(["user"]), cartRouter);
router.use("/products", productRouter);

export default router;