import { Router } from "express";
import fs from "fs";

const router = Router();

const products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));

router.get("/", (request, response) => {
    response.json(products);
});

router.get("/:pid", (request, response) => {
    const {pid} = request.params;
    const product = products.find(product => product.id == pid);

    if(!product) {
        response.status(400).json({ error: "No existe el producto solicitado."})
    } else {
        response.json(product);
    }
});

router.post("/", (request, response) => { 
    const newId = products[products.length - 1].id +1;
    const productoExiste = products.find(product => product.code === code);

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
    } else if (productoExiste){
        return response.status(400).json ({
            error: "El código del producto ya existe",
        });
    } else {
        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category
        }
        products.push(newProduct);
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
        response.status(201).json ({
            message: `El producto de id ${newProduct.id} ha sido agregado correctamente`
        });
    }
});

router.put("/:pid", (request, response) => {
    const {pid} = request.params;
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    } = request.body;

    const productoExiste = products.find(product => product.code === code);
    const productIndex = products.find(product => product.id == pid);

    if(!productIndex) {
        return response.status(400).json({ 
            error: 'No se encuentra el producto con el id solicitado' 
        });
    } else if (productoExiste){
        return response.status(400).json ({
            error: "El código del producto ya existe",
        });
    } else {
        products[productIndex] = {
            ...products[productIndex],
            title,
            description,
            code,
            price,
            status,
            stock,
            category
        }
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
        response.json(productIndex);
    };
});

router.delete("/:pid", (request, response) => {
    const {pid} = request.params;
    const productIndex = products.findIndex(product => product.id == pid);

    if(productIndex === -1) {
        response.status(400).json({ 
            error: "No existe el producto solicitado."
        });
    } else {
        products.splice(productIndex, 1);
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
        response.status(204).json({
            message: "El producto ha sido eliminado satisfactoriamente"
        });
    }
});

export default router;