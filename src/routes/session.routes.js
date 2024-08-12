import { Router } from "express";
import { userManager } from "../managers/UserManager.js";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/login-fail",}), userManager.login);

router.get("/login-fail", userManager.loginFail);

router.post("/register", passport.authenticate("register", {session: false}), userManager.register);

router.get("/logout", userManager.logout);

router.get("/current", passport.authenticate("current", { session: false }), userManager.current);

export default router;