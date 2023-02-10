import { combineReducers } from "redux";
import isLoggedIn from "./login/isLoggedIn";
import loginInfo from "./login/loginInfo";
import discountedProducts from "./home/discountedProducts";
import productsList from "./home/productsList";
import productInfo from "./product/productInfo";
import similarProducts from "./product/similarProducts";
import cartList from "./cart/cartList";
import selectedProductSpecifications from "./product/selectedProductSpecifications";

const allReducers = combineReducers({
    isLoggedIn,
    loginInfo,
    discountedProducts,
    productsList,
    productInfo,
    similarProducts,
    cartList,
    selectedProductSpecifications,
})

export default allReducers;