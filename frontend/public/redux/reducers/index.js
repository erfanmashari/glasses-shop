import { combineReducers } from "redux";
import isLoggedIn from "./login/isLoggedIn";
import loginInfo from "./login/loginInfo";
import discountedProducts from "./home/discountedProducts";
import productsList from "./home/productsList";
import productInfo from "./product/productInfo";
import similarProducts from "./product/similarProducts";
import cartList from "./cart/cartList";
import selectedProduct from "./product/selectedProduct";
import personalInfo from "./profile/personalInfo";
import addressForm from "./profile/addressForm";
import addressList from "./profile/addressList";
import orderInfo from "./checkout/orderInfo";
import newCommentInfo from "./product/newCommentInfo";
import selectedOrder from "./profile/selectedOrder";
import transactionInfo from "./payment/transactionInfo";
import selectedComment from "./profile/selectedComment";
import selectedAddress from "./profile/selectedAddress";

const allReducers = combineReducers({
    isLoggedIn,
    loginInfo,
    discountedProducts,
    productsList,
    productInfo,
    similarProducts,
    cartList,
    selectedProduct,
    personalInfo,
    addressForm,
    addressList,
    orderInfo,
    newCommentInfo,
    selectedOrder,
    transactionInfo,
    selectedComment,
    selectedAddress,
})

export default allReducers;