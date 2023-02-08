import { combineReducers } from "redux";
import isLoggedIn from "./login/isLoggedIn";
import discountedProducts from "./home/discountedProducts";
import productsList from "./home/productsList";
import productInfo from "./productInfo/productInfo";
import cartList from "./cart/cartList";
import selectedProductSpecifications from "./productInfo/selectedProductSpecifications";

const allReducers = combineReducers({
    isLoggedIn,
    discountedProducts,
    productsList,
    productInfo,
    cartList,
    selectedProductSpecifications,
})

export default allReducers;