import { Router } from "express";
import { cartManager } from "../managers/CartManager.js";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/:cid", async(request, response) => {

    try {
        const cart = await cartManager.getProductsInCart(request.params.cid);
        
        if (!cart) {
            response.status(400).json("No se encuentra el carrito buscado.");
        } 

        response.json(cart);
    } catch (error) {
        response.status(400).json({ error: 'Error al obtener el carrito' });
    }
});

router.post("/", async (request, response) => {
    try {
        const result = await cartManager.createCart();
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al crear el carrito' });
    }
});

router.post("/:cid/product/:pid", async (request, response) => {
    try {
        const result = await cartManager.addProductToCart(request.params.cid, request.params.pid);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al agregar el producto al carrito' });
    }
});  

router.put("/:cid", async (request, response) => {
    try {
        const result = await cartManager.updateCartProducts(request.params.cid, request.body.products);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al actualizar el carrito' });
    }
});

router.put("/:cid/product/:pid", async (request, response) => {
    try {
        const result = await cartManager.updateProductQuantity(request.params.cid, request.params.pid, request.body.quantity);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al actualizar el producto del carrito' });
    }
});

router.delete("/:cid", async (request, response) => {
    try {
        await cartManager.deleteProductsFromCart(request.params.cid);
        response.json('Productos eliminados del carrito');
    } catch (error) {
        response.status(400).json({ error: 'Error al eliminar el carrito' });
    }
});

router.delete("/:cid/product/:pid", async (request, response) => {
    try {
        await cartManager.deleteProductFromCart(request.params.cid, request.params.pid);
        response.json('Producto eliminado del carrito');
    } catch (error) {
        response.status(400).json({ error: 'Error al eliminar el producto del carrito' });
    }
});

export default router;