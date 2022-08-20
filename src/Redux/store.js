import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "./Slice/authSlice";
import productReducer from "./Slice/productSlice"
import filterReducer from "./Slice/filterSlice"
import cartReducer from "./Slice/cartSlice"
import checkoutReducer from "./Slice/checkoutSlice";
import orderReducer from "./Slice/orderSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})
export default store;