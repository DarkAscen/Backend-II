import { Router } from "express";
import fs from "fs";

const router = Router();

const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));

router.get("/", (request, resolve) => {
    resolve.render("home", { products });	
})

router.get("/realtimeproducts", (request, resolve) => {
    resolve.render("realtimeproducts", { products });
})  

export default router;