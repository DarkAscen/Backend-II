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
    const {title, description, code, price, status, stock, category} = request.body;
    const newId = products[products.length - 1].id +1;

    if (!title || description || !code || !price || !stock || !category) {
        return response.status(400).json ({
            error: "Debe ingresar todos los campos",
        });
    } else {
        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category
        }
        products.push(newProduct);
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
    }
    response.json(products);
});

router.put("/:pid", (request, response) => {
    const {pid} = request.params;
    const {title, description, code, price, stock, caregory} = request.body;

    if(!title || description || !code || !price || !stock || !category) {
        return response.status(400).json ({
            error: "Debe ingresar todos los campos",
        });
    } else {
        const product = products.find(product => product.id == pid);

        if(!product) {
            response.status(400).json({ error: 'No se encuentra el producto con el id solicitado' })
        } else {
            product.title = title;
            product.description = description;
            product.code = code;
            product.price = price;
            product.stock = stock;
            product.category = category;
            fs.writeFileSync('./data/products.json', JSON.stringify(products, null, '\t'));
            response.json(product);
        }
    };
});

router.delete("/:pid", (request, response) => {
    const {pid} = request.params;
    const productIndex = products.findIndex(product => product.id == pid);

    if(productIndex === -1) {
        response.status(400).json({ error: "No existe el producto solicitado."})
    } else {
        products.splice(productIndex, 1);
        fs.writeFileSync('./data/products.json', JSON.stringify(products, null, '\t'));
    }
});

export default router;