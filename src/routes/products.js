import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", async (request, response) => {
    const result = await productManager.getProducts(request.query);
    response.json(result);
});

router.get("/:pid", async (request, response) => {
    try {
        const product = await productManager.getProductById(request.params.pid);
        if(!product) {
            response.status(400).json({ error: "No existe el producto solicitado."})
        } else {
            response.json(product);
        }
    } catch (error) {
        response.status(400).json({ error: 'Error al obtener el producto' });
    }
});

router.post("/", async (request, response) => { 
    const {
        title,
        description,
        code,
        price, 
        status, 
        stock, 
        category
    } = request.body;

    if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
    ) {
        return response.status(400).json ({
            error: "Debe ingresar todos los campos",
        });
    }

    try {
        const result = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category
        });
        response.json(result);
    } catch (error) {
        response.status(400).json ({
            error: 'Error al agregar el producto'
        });
    }
});

router.put("/:pid", async (request, response) => {
    try {
        const result = await productManager.updateProduct(request.params.pid, request.body);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete("/:pid", async (request, response) => {
    try {
        const result = await productManager.deleteProduct(request.params.pid);
        response.json(result);
    } catch (error) {
        response.status(400).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;