import {instance} from "../api/axios.ts";
import {IProductData} from "../types/types.ts";

export const ProductService = {

    async getAllProducts() {
        const {data} = await instance.get('products')
        if (data) return data;
    },

    async createProduct(productData: IProductData) {
        const {data} = await instance.post('products', productData);
        if(data) return data;
    },

    async changeProduct(productData: IProductData) {
        const {data} = await instance.put('products', productData);
        if(data) return data;
    },

    async deleteProduct(id: number) {
        const {data} = await instance.delete(`products/${id}`);
        if(data) return data;
    }
}