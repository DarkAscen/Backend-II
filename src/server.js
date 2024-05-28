import express from "express";
import routerProducts from "./routes/products.js";
import routerCarts from "./routes/carts.js";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/api/products", routerProducts);

app.use("/api/carts", routerCarts);

app.listen(PORT, () => {
    console.log(`Servidor creado en puerto http://localhost:${PORT}`);
});