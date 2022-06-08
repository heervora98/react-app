import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { getProducts } from './productApi';
import { getuserData } from './productApi';
import { getCartData } from './productApi'

const initialState = {
  value: 0,
  status: false,
  products: [],
  users: [],
  cart: []
};


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);


export const getAllProductData = createAsyncThunk(
  'counter/fetchProduct',
  async () => {
    const response = await getProducts();
    console.log(response.data);
    return response.data;
  }
)

export const getuser = createAsyncThunk(
  'counter/fetchuser',
  async () => {
    const response = await getuserData()
    console.log(response.data, 'RESPONSEDATA');
    return response.data
  }
)

export const getCartAllData = createAsyncThunk(
  'counter/factCart',
  async () => {
    const response = await getCartData()
    console.log(response.data, 'cartData');
    return response.data
  }
)


export const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    increment: (state) => {
     
      
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
 
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = true;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = false;
        state.value += action.payload;
      })
      .addCase(getAllProductData.pending,(state) => {
        state.status = true;
      })
      .addCase(getAllProductData.fulfilled , (state,action) => {
        state.status = false;
        state.products = action.payload
      })
      .addCase(getuser.pending, (state) => {
        state.status = true
      })
      .addCase(getuser.fulfilled, (state,action) => {
        state.status = false
        state.users =  action.payload
      })

      .addCase(getCartAllData.pending, (state) => {
        state.status = true
      })
      .addCase(getCartAllData.fulfilled, (state,action) => {
        state.status = false
        state.cart =  action.payload
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectCount = (state) => state.counter.value;
export const selectStatus = (state) => state.counter.status;
export const selectProduct = (state) => state.counter.products;
export const selectUser = (state) => state.counter.users;
export const selectUserstatus = (state) => state.counter.status;
export const selectcartData = (state) => state.counter.cart;


export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
