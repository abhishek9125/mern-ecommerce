import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    coupon: couponReducer,
    drawer: drawerReducer,
    COD: CODReducer
});

export default rootReducer;