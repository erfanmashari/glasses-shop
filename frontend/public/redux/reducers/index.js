import { combineReducers } from "redux";
import isLoggedIn from "./login/isLoggedIn";
import discountedProducts from "./home/discountedProducts";
import productsList from "./home/productsList";
import productInfo from "./product/productInfo";
import cartList from "./cart/cartList";
import selectedProductSpecifications from "./product/selectedProductSpecifications";

const allReducers = combineReducers({
    isLoggedIn,
    discountedProducts,
    productsList,
    productInfo,
    cartList,
    selectedProductSpecifications,
})

export default allReducers;