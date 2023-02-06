import ProfileMenu from "./ProfileMenu";
import CartList from "./CartList";

// import from next core
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { useSelector } from "react-redux";

// import icons
import { TbLogin } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import layoutStyles from "../../../styles/Layout.module.css";

const Header = () => {
  // state for showing profile list menu
  const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(true);

  // state for showing small cart window
  const [isCartHidden, setIsCartHidden] = useState(true);

  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // get product info from redux/reducers/cart/cartList.js
  const cartList = useSelector((state) => state.cartList);

  return (
    <header
      className={`w-full grid grid-cols-3 grid-flow-row justify-items-stretch bg-white text-stone-800 pl-8 pr-4 py-0`}
    >
      <div className="flex flex-row justify-center items-center justify-self-start self-start">
        <Image
          src={"/images/sudo-orange.png"}
          alt="logo"
          width={80}
          height={80}
        />
        {isLoggedIn ? (
          <div className="flex flex-col relative justify-start items-center">
            <button
              onClick={() => setIsProfileMenuHidden(!isProfileMenuHidden)}
              className="flex flex-row justify-center items-center text-stone-800 rounded-lg gap-1.5 p-2"
            >
              <FaUser className="w-6 h-6" />
              {isProfileMenuHidden ? (
                <IoMdArrowDropdown className="w-5 h-5 relative left-1" />
              ) : (
                <IoMdArrowDropup className="w-5 h-5 relative left-1" />
              )}
            </button>
            {!isProfileMenuHidden && <ProfileMenu />}
          </div>
        ) : (
          <Link href={"login/"}>
            <button className="flex flex-row justify-center items-center text-slate-500 border-2 border-stone-900/50 rounded-lg gap-1.5 p-2">
              <TbLogin className="w-6 h-6" />
              <span>ورود | ثبت نام</span>
            </button>
          </Link>
        )}
      </div>
      <div className="w-9/12 h-fit flex flex-row justify-center items-center justify-self-center self-center gap-3">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold text-red-600 cursor-pointer">
            Sudo Shop
          </h1>
        </Link>
      </div>
      <div className="flex flex-row justify-end items-center justify-self-end self-center gap-3">
        <GoSearch className="w-6 h-6" />
        <div 
        onMouseOver={() => setIsCartHidden(false)}
        onMouseLeave={() => setIsCartHidden(true)}
        className="relative flex flex-col justify-start items-end">
          <Link href={"/cart/"}>
          <button
            className="h-fit relative flex flex-row justify-center items-center text-sm text-slate-500 border-2 border-stone-900/50 rounded-3xl gap-2 px-2 py-1"
          >
            <span className="text-lg">سبد خرید</span>
            <FiShoppingCart className="w-5 h-5" />
            <span
              className={`${layoutStyles["cart-badge"]} ${
                !cartList.length ? "hidden" : ""
              } absolute text-white bg-red-600 rounded-3xl pt-0.5 px-1.5`}
            >
              {cartList.length}
            </span>
          </button>
          </Link>
          <div className={`relative ${isCartHidden || cartList.length === 0 ? "hidden" : ""}`}>
            <CartList />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
