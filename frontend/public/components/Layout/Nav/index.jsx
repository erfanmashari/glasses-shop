// import components
import ProductsList from "./ProductsList";
import SearchBox from "./SearchBox";

import Link from "next/link";

import { useSelector } from "react-redux";

import { getUserInfo } from "../../../functions";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Nav = () => {
  // get user login status from redux/reducer/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <nav
        className="w-full h-12 flex flex-row"
        style={{
          backgroundColor: "#DBDDDC",
          // backgroundImage: "linear-gradient(to left, #5a5a5a, #f7f7f7)",
        }}
      >
        <div
          className="w-full h-full flex flex-row justify-between items-center rounded-bl-2xl pl-2.5 pr-8 py-2"
          style={{
            backgroundImage: "linear-gradient(to left, #eeeeee, #fafafa)",
          }}
        >
          <ProductsList />
          <SearchBox />
        </div>
        <div className="w-max h-full flex flex-row justify-center items-center gap-2 py-2 px-8">
          <Link
            href={"/cart"}
            className="w-max h-fit flex flex-row justify-center items-center text-sm rounded-lg gap-1.5 px-2.5 py-1"
            style={{ color: "rgb(117, 131, 122)" }}
          >
            <ShoppingBagOutlinedIcon /> سبد خرید
          </Link>
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className="w-max h-fit flex flex-row justify-center items-center text-sm rounded-lg gap-1 px-2.5 py-1"
            style={{
              background: isLoggedIn ? "inherit" : "#06291D",
              color: isLoggedIn ? "#06291D" : "#fff",
              border: "2px solid #06291D",
            }}
          >
            <PersonOutlineOutlinedIcon /> {isLoggedIn ? "حساب کاربری" : "ورود"}
          </Link>
        </div>
      </nav>
      <div
        style={{
          height: "30px",
          backgroundColor: "#DBDDDC",
          // backgroundImage:
          //   "linear-gradient(to left, #DBDDDC, #E1E3E0, #DBDDDC)",
        }}
      ></div>
    </>
  );
};

export default Nav;
