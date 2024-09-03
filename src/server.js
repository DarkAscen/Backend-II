import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path"
import passport from "passport";

import routes from "./routes/index.js";
import viewsRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars"
import __dirname from "./dirname.js";
import MongoStore from "connect-mongo";
import { productModel } from "./models/product.model.js";
import { initializePassport } from "./config/passport.config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT;
const dbName = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(cookieParser(jwtSecret));
app.use(session({ 
    store: MongoStore.create({
        mongoUrl: dbName,
        ttl: 3600,
    }),
    secret: jwtSecret,
    resave: false,
    saveUninitialized: false }));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use("/api", routes);
app.use("/", viewsRoutes);
app.use("*", (req, res) => {
    res.status(404).send("Not found");
});
app.use(errorMiddleware);

mongoose.connect(dbName)
    .then(() => console.log("Connection to MongoDB established"))
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    });

const httpServer = app.listen(PORT, () => {
    console.log(`Server created on port http://localhost:${PORT}`);
});

const io = new Server(httpServer);

let products = await productModel.find();

io.on("connection", async (socket) => {
    console.log("Connection established");

    try {
        const products = await productModel.find();
        socket.emit("products", products);
    } catch (error) {
        console.log(error);
    }

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("addProduct", (product) => {
        const newId = products[products.length - 1].id + 1;
        const newProduct = { id: newId, ...product };
        products.push(newProduct);
        fs.writeFileSync("./src/data/products.json", JSON.stringify(products, null, "\t"));
        io.emit("productos", products);
    });

    socket.on("deleteProduct", (productId) => {
        products = products.filter(p => p.id !== productId);
        fs.writeFileSync("./src/data/products.json", JSON.stringify(products, null, "\t"));
        io.emit("products", products);
    });

    socket.emit("products", products);
});