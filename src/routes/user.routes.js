import { Router } from "express";
import { userManager } from "../managers/UserManager.js";
import { authorize } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/", authorize(["admin"]), userManager.getUsers);
router.get("/:uid", authorize(["admin"]), userManager.getUserById);
router.post("/", authorize(["admin"]), userManager.addUser);
router.put("/:uid", authorize(["admin"]), userManager.updateUser);
router.delete("/:uid", authorize(["admin"]), userManager.deleteUser);

export default router;