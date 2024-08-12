import { Router } from "express";
import { cartManager } from "../managers/CartManager.js";

const router = Router();

router.get("/:cid", async(req, res) => {

    try {
        const cart = await cartManager.getProductsInCart(req.params.cid);
        
        if (!cart) {
            res.status(400).json("No se encuentra el carrito buscado.");
        } 

        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener el carrito' });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await cartManager.addCart();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el carrito' });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar el producto al carrito' });
    }
});  

router.put("/:cid", async (req, res) => {
    try {
        const result = await cartManager.updateCartProducts(req.params.cid, req.body.products);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el carrito' });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const result = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el producto del carrito' });
    }
});

router.delete("/:cid", async (req, res) => {
    try {
        await cartManager.deleteProductsFromCart(req.params.cid);
        res.json('Productos eliminados del carrito');
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el carrito' });
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
        res.json('Producto eliminado del carrito');
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el producto del carrito' });
    }
});

export default router;