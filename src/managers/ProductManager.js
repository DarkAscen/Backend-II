import { productService } from "../services/products.services.js";

class ProductManager {

    async getProducts(params) {
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 5,
        }

        if (params.sort && (params.sort === "asc" || params.sort === "desc")) paginate.sort = { price: params.sort}

        const products = await productService.getProducts(paginate);

        products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}` : null;
        products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}` : null;

        if (products.prevLink && paginate.limit !== 5) products.prevLink += `&limit=${paginate.limit}`
        if (products.nextLink && paginate.limit !== 5) products.nextLink += `&limit=${paginate.limit}`

        if (products.prevLink && paginate.sort) products.prevLink += `&sort=${params.sort}`
        if (products.nextLink && paginate.sort) products.nextLink += `&sort=${params.sort}`

        return products;
    }

    async getProductById(pid) {
        try {
            const product = await productService.getProductById(pid);
            if (!product) { 
                console.log("Product not found");
                return;
            } else { 
                return product;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(productData) {
        const { title, description, code, price, status, stock, category } = productData;

        if (
            !product.title ||
            !product.description ||
            !product.code ||
            !product.price ||
            !product.status ||
            !product.stock ||
            !product.category
        ) {
            console.log("Error: You must enter all the fields.");
            return;
        }

        try {
            const productExist = await productService.getProductById(productData.code);

            if (productExist) {
                console.log("Error: The product code already exists");
                return;
            }
            return await productService.addProduct(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(pid, productData) {
        try {
            const product = await productService.updateProduct(pid, productData);
            if (!product) {
                console.log("Product not found");
                return;
            } else {
                console.log("Product updated correctly");
            } 
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(pid) {
        try {
            const product = await productService.deleteProduct(pid);
            if (!product) {
                console.log("Product not found");
                return;
            } else {
                console.log("Product deleted correctly");
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProductStock(pid, quantity) {
        try {
            const product = await productService.updateProductStock(pid, quantity);
            if (!product) {
                console.log("Product not found");
                return;
            } else {
                console.log("Product updated correctly");
            } 
        } catch (error) {
            throw new Error(error);
        }
    }
};

export const productManager = new ProductManager();
