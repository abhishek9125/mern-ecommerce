import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    coupon: couponReducer,
    drawer: drawerReducer
});

export default rootReducer;