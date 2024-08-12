import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", (req, res) => {
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
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

router.get("login", (req, res) => {
    const isSession = req.session.passport ? false : true;

    if (!isSession) {
        return res.redirect("/");
    }

    res.render("login");
});


export default router;