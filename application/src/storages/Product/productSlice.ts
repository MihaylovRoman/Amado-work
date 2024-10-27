import {IProductData, IProductState} from "../../types/types.ts";
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ProductService} from "../../services/product.service.ts";


const initialState: IProductState = {
    products: [],
    isLoading: false,
    isError: false,
}


export const getAllProducts = createAsyncThunk(
    'products/getAllProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ProductService.getAllProducts();
            return response.data;
        }
        catch (e: any){
            return rejectWithValue(e.message)
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (credentials: IProductData, {rejectWithValue}) => {
        try {
            const response = await ProductService.createProduct(credentials);
            return response.data;
        }
        catch (e: any){
            return rejectWithValue(e.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await ProductService.deleteProduct(id);
            return response.data;
        }
        catch (e: any){
            return rejectWithValue(e.message)
        }
    }
)

export const changeProduct = createAsyncThunk(
    'products/changeProduct',
    async (credentials: IProductData, {rejectWithValue}) => {
        try {
            const response = await ProductService.changeProduct(credentials);
            return response.data;
        }
        catch (e: any){
            return rejectWithValue(e.message)
        }
    }
)



const productSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.products = state.products.filter((product) => product.id !== action.payload);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })

            .addCase(changeProduct.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(changeProduct.fulfilled, (state, action: PayloadAction<IProductData>) => {
                state.isLoading = false
                const index = state.products.findIndex((product) => product.id === action.payload.id)
                if(index !== -1){
                    state.products[index] = action.payload
                }
            })
            .addCase(changeProduct.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })

            .addCase(getAllProducts.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<IProductData[]>) => {
                state.isLoading = false
                state.products = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })

            .addCase(createProduct.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<IProductData[]>) => {
                state.isLoading = false
                state.products = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })

    }
})

export const {
    setLoading
} = productSlice.actions;

export default productSlice.reducer;
