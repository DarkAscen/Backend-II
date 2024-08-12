import { generateToken } from "../utils/jwt.js";

class UserManager {
    async login(req, res){
        console.log(req.user);

        const payload = {
            email: req.user.email,
            role: req.user.role,
        };

        const token = generateToken(payload);

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
        });

        res.status(200).json({ message: "Login exitoso" }, token);
    }

    async current (req, res) {
        console.log(req.user);
        res.json({ message: "Usuario logueado" });
    }

    async logout (req, res) {
        res.clearCookie("token");
        res.json({ message: "Sesión cerrada" });
    }

    async loginFail (req, res) {
        res.json({ message: "Error al iniciar sesión" });
    }

    async register (req, res) {
        console.log(req.user);
        res.status(201).json({ message: "Usuario registrado" }, token);
    }
}

export const userManager = new UserManager();