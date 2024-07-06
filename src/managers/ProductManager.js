import { productModel } from '../models/product.model.js';

class ProductManager {

    async getProducts(params) {
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 5,
        }

        if (params.sort && (params.sort === 'asc' || params.sort === 'desc')) paginate.sort = { price: params.sort}

        const products = await productModel.paginate({}, paginate);

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
            const product = await productModel.findById(pid);
            if (!product) { 
                console.log('Producto no encontrado');
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
            console.log('Error: Debe ingresar todos los campos.');
            return;
        }

        try {
            const productExist = await productModel.findById(productData.code);

            if (productExist) {
                console.log('Error: El código del producto ya existe');
                return;
            }
            return await productModel.create(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(pid, productData) {
        try {
            const product = await productModel.findByIdAndUpdate(pid, productData);
            if (!product) {
                console.log('Producto no encontrado');
                return;
            } else {
                console.log('Producto actualizado correctamente');
            } 
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(pid) {
        try {
            const product = await productModel.findByIdAndDelete(pid);
            if (!product) {
                console.log('Producto no encontrado');
                return;
            } else {
                console.log('Producto eliminado correctamente');
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productManager = new ProductManager();
