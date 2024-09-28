import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchCategories = createAsyncThunk(
  'catalog/fetchCategories',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data.map(category => ({
      slug: category,
      name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
    }));
  }
);

export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async ({ category, searchQuery, page }, { getState }) => {
    const { itemsPerPage } = getState().catalog;
    let url = `${API_BASE_URL}/products`;
    if (category) {
      url += `/category/${category}`;
    }
    url += `?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;

    const response = await axios.get(url);
    let products = response.data.products;

    if (searchQuery) {
      const regex = new RegExp(searchQuery.split(' ').map(word => `(?=.*${word})`).join(''), 'i');
     products = products.filter(product =>
        regex.test(product.title) || regex.test(product.description)
      );
    }

    return {
      products,
      totalCount: response.data.total,
      currentPage: page,
    };
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    categories: [],
    products: [],
    selectedCategory: '',
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 10,
    totalCount: 0,
    loading: false,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      state.products = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.products = [];
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = state.currentPage === 1 
          ? action.payload.products 
          : [...state.products, ...action.payload.products];
        state.totalCount = action.payload.totalCount;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedCategory, setSearchQuery, incrementPage, resetPagination } = catalogSlice.actions;

export default catalogSlice.reducer;