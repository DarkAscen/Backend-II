import { Router } from "express";
import fs from "fs";

const router = Router();

const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));
const carts = JSON.parse(fs.readFileSync('./src/data/carts.json', 'utf-8'));

router.post("/carts", (request, response) => {
    const newId = carts[carts.length -1].id +1;
    const newCart = {
        id: newId,
        products: []
    };

    carts.push(newCart);
    fs.writeFileSync('.src/data/carts.json', JSON.stringify(carts, null, '\t'));
    response.json(carts);
});
    
router.get("/:cid", (request, response) => {

    const {cid} = request.params;
    const cart = carts.find(cart => cart.id == cid);

    if (!cart) {
        response.status(400).json("No se encuentra el carrito buscado.");
    } else {
        response.json(cart);
    };
});

router.post("/:cid/product/:pid", (request, response) => {
    const {cid, pid} = request.params;
    const cart = carts.find(cart => cart.id == cid);
    const product = products.find(product => product.id == pid);
    const exists = cart.products.find(product => product.product == pid);

    if(!cart) {
        response.status(400).json("No se encuentra el carrito buscado");
    } else {
        if (exists){
            exists.quantity += 1;
        } else {
            cart.products.push({ product: product.id, quantity: 1});
        }
        fs.writeFileSync('./src/data/carts.json', JSON.stringify(carts, null, '\t'));
        response.json(cart);
    }
});  

export default router;