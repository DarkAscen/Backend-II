import { Router } from "express";
import { productManager } from "../managers/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    const result = await productManager.getProducts(req.query);
    res.json(result);
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if(!product) {
            res.status(400).json({ error: "No existe el producto solicitado."})
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener el producto' });
    }
});

router.post("/", async (req, res) => { 
    const {
        title,
        description,
        code,
        price, 
        status, 
        stock, 
        category
    } = req.body;

    if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
    ) {
        return res.status(400).json ({
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
        res.json(result);
    } catch (error) {
        res.status(400).json ({
            error: 'Error al agregar el producto'
        });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const result = await productManager.updateProduct(req.params.pid, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const result = await productManager.deleteProduct(req.params.pid);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el producto' });
    }
});

export default router;