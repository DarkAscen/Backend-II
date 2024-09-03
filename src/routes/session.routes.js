import { Router } from "express";
import { authManager } from "../managers/AuthManager.js";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/login-fail",}), authManager.login);

router.get("/login-fail", authManager.loginFail);

router.post("/register", passport.authenticate("register", {session: false, failureRedirect: "/api/sessions/register-fail",}), authManager.register);

router.get("/register-fail", authManager.registerFail);

router.get("/logout", authManager.logout);

router.get("/current", passport.authenticate("current", { session: false }), authManager.current);

export default router;