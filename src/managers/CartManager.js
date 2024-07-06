import { productManager } from './ProductManager.js';
import { cartModel } from '../models/cart.model.js';

class CartManager {
    constructor(productManager) {
        this.productManager = productManager;
    }

    async getCarts() {
        try {
            return await cartModel.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            } else {
                return cart;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductsInCart(cid) {
        try {
            const cart = await cartModel.findById(cid).populate('products.product');

            if (!cart) {
                throw new Error('Carrito no encontrado');
            } else {
                return cart.products;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async addCart() {
        try {
            return await cartModel.create({ products: [] });
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(cid, pid) {
        const product = await productManager.getProductById(pid);
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        } 

        if (!product) {
            throw new Error('Producto no encontrado');
        }
        
        try {
            const productAlreadyExists = cart.products.find(product => product.product === pid);

            if (productAlreadyExists) {
                productAlreadyExists.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1});
            }
            await cart.save();
            console.log('Producto agregado correctamente');
        } catch (error) {
            throw new Error(error);
        }
    } 

    async updateProductQuantity(cid, pid, quantity) {
        const product = await productManager.getProductById(pid);
        const cart = await cartModel.findById(cid);
        
        if (!cart) {
            throw new Error('Carrito no encontrado');
        } 

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        try {
            const productAlreadyExists = cart.products.find(product => product.product === pid);

            if (productAlreadyExists) {
                productAlreadyExists.quantity = quantity;
            } else {
                throw new Error('Producto no encontrado');
            }
            await cart.save();
            console.log('Producto actualizado correctamente');
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCartProducts(cid, products) {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        } 

        try {
            cart.products = products;
            await cart.save();
            console.log('Productos actualizados correctamente');
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProductFromCart(cid, pid) {
        const product = await productManager.getProductById(pid);
        const cart = await cartModel.findById(cid);
        
        if (!cart) {
            throw new Error('Carrito no encontrado');
        } 

        if (!product) {
            throw new Error('Producto no encontrado');
        }
        
        try {
            const index = cart.products.findIndex(product => product.product === pid);
            cart.products.splice(index, 1);
            await cart.save();
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async deleteProductsFromCart(cid) {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        } 

        try {
            cart.products = [];
            await cart.save();
            console.log('Procutos eliminados correctamente');
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const cartManager = new CartManager();
