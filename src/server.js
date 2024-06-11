import express from "express";
import routerProducts from "./routes/products.js";
import routerCarts from "./routes/carts.js";
import viewsRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars"
import path from "path"
import __dirname from "./dirname.js";
import { Server } from "socket.io";
import fs from "fs";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor creado en puerto http://localhost:${PORT}`);
});

const io = new Server(httpServer);

let products = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));

io.on("connection", (socket) => {
    console.log("Conexión establecida");

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    socket.on('addProduct', (product) => {
        const newId = products[products.length - 1].id + 1;
        const newProduct = { id: newId, ...product };
        products.push(newProduct);
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
        io.emit('productos', products);
        response.status(201).json ({
            message: `El producto de id ${newProduct.id} ha sido agregado correctamente`
        });
    });

    socket.on('deleteProduct', (productId) => {
        products = products.filter(p => p.id !== productId);
        fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, '\t'));
        io.emit('productos', products);
        response.status(204).json({
            message: "El producto ha sido eliminado satisfactoriamente"
        });
    });
});