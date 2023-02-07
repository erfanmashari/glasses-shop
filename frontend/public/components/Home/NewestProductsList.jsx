import NewestProductsItem from "./NewestProductsItem";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const NewestProductsList = () => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-3 p-8"
      style={{ background: "#EBEBEB" }}
    >
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-lg gap-3">
        <header className="w-full flex flex-row justify-between items-center border-b-2 border-gray-300 py-2 px-4">
          <h4 className="text-2xl font-bold text-stone-700 border-r-4 border-stone-700 pr-2">
            عینک طبی
          </h4>
          <button className="text-lg text-gray-400">
            بیشتر
            <KeyboardArrowLeftOutlinedIcon />
          </button>
        </header>
        <ul className="w-full flex flex-row gap-8" style={{ height: "400px" }}>
          <NewestProductsItem />
          <NewestProductsItem />
          <NewestProductsItem />
          <NewestProductsItem />
        </ul>
      </div>
    </div>
  );
};

export default NewestProductsList;
