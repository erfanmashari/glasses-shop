// import components
import ProductsList from "./ProductsList";
import SearchBox from "./SearchBox";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Nav = () => {
  return (
    <>
      <nav
        className="w-full h-12 flex flex-row"
        style={{
          backgroundColor: "#DBDDDC"
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
          <button
            className="w-max h-fit flex flex-row justify-center items-center text-sm rounded-lg gap-1.5 px-2.5 py-1"
            style={{ color: "rgb(117, 131, 122)" }}
          >
            <ShoppingBagOutlinedIcon /> سبد خرید
          </button>
          <button
            className="w-max h-fit flex flex-row justify-center items-center text-white text-sm rounded-lg gap-1 px-2.5 py-1.5"
            style={{ background: "#06291D" }}
          >
            <PersonOutlineOutlinedIcon /> ورود
          </button>
        </div>
      </nav>
      <div
        style={{
          height: "30px",
          backgroundColor: "#DBDDDC"
          // backgroundImage:
          //   "linear-gradient(to left, #DBDDDC, #E1E3E0, #DBDDDC)",
        }}
      ></div>
    </>
  );
};

export default Nav;
