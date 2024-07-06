import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", (request, response) => {
    const products = productManager.getProducts();
    response.render("home", { 
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

router.get("/realtimeproducts", (request, response) => {
    response.render("realTimeProducts");
});

export default router;