import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = productManager.getProducts();
        const isSession = req.session.passport ? false : true;
        res.render("home", { 
            products,
            prevLink: {
                exist: products.prevLink ? true : false,
                link: products.prevLink
            },
            nextLink: {
                exist: products.nextLink ? true : false,
                link: products.nextLink
            }
        });
    } catch (error) {
        res.status(400).json({ error: "Error getting the products" });
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(400).json({ error: "Error getting the products" });
    }
});

router.get("login", async (req, res) => {
    try {
        const isSession = req.session.passport ? false : true;

        if (!isSession) {
            return res.redirect("/");
        }

        res.render("login");
    } catch (error) {
        res.status(400).json({ error: "Error logging in" });
    }
});


export default router;