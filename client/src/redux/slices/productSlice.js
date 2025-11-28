import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams(filters);
            const { data } = await api.get(`/products?${params}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`/products/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

export const fetchTrendingProducts = createAsyncThunk(
    'products/fetchTrending',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/products/trending');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending products');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        trendingProducts: [],
        selectedProduct: null,
        loading: false,
        error: null,
        pagination: {
            page: 1,
            pages: 1,
            total: 0,
        },
        filters: {
            category: '',
            minPrice: '',
            maxPrice: '',
            rating: '',
            sort: '',
            search: '',
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: '',
                minPrice: '',
                maxPrice: '',
                rating: '',
                sort: '',
                search: '',
            };
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = {
                    page: action.payload.page,
                    pages: action.payload.pages,
                    total: action.payload.total,
                };
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch trending products
            .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
                state.trendingProducts = action.payload;
            });
    },
});

export const { setFilters, clearFilters, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
