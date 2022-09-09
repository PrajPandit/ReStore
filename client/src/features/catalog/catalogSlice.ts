import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";


interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productsParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
        const params = new URLSearchParams();
        params.append('pageNumber', productParams.pageNumber.toString());
        params.append('pageSize', productParams.pageSize.toString());
        params.append('orderBy', productParams.orderBy.toString());
        if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm.toString());
        if(productParams.brands?.length > 0) params.append('brands', productParams.brands.toString());
        if(productParams.types?.length > 0) params.append('types', productParams.types.toString());

        return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_,thunkAPI) => {

        const params = getAxiosParams(thunkAPI.getState().catalog.productsParams);

        try {
            const response =  await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    } 
)

export const fetchProductAsync = createAsyncThunk<Product,number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    } 
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    } 
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: [],
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        brands: [],
        types: [],
        status:'idle',
        productsParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productsParams= {...state.productsParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded= false;
            state.productsParams= {...state.productsParams, ...action.payload};
        },
        resetProductParams: (state) => {
            state.productsParams = initParams();
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        }

    },

    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const productsSelector = productsAdapter.getSelectors((state: RootState) => state.catalog)

export const {setProductParams, resetProductParams, setMetaData, setPageNumber} = catalogSlice.actions;