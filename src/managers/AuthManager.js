import { userService } from "../services/user.services.js";
import { generateToken } from "../utils/jwt.js";

class AuthManager {
    async login(req, res){
        try {
            const payload = {
                email: user.email,
                password: user.password,
            };

            const token = generateToken(payload);

            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });

            res.status(200).json({ message: "User logged in", token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", details: error.message });
        }
    }

    async current (req, res) {
        try {
            res.json({ message: "User logged in" });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", details: error.message });
        }
    }

    async logout (req, res) {
        try {
            res.clearCookie("token");
            res.json({ message: "Session closed" });
        } catch (error) {
            res.status(500).json({ message: "Error logging out", details: error.message });
        }
    }

    async loginFail (req, res) {
        try {
            res.json({ message: "Error logging in" });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", details: error.message });
        }
    }

    async registerFail (req, res) {
        try {
            res.json({ message: "Error registering" });
        } catch (error) { 
            res.status(500).json({ message: "Error registering", details: error.message });
        }
    }

    async register (req, res) {
        try {
            res.status(201).json({ message: "User registered" }, token);
        } catch (error) {
            res.status(500).json({ message: "Error registering", details: error.message });
        }
    }
}

export const authManager = new AuthManager();