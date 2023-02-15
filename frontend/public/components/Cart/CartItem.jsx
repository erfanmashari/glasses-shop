import Image from "next/image";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ isLast }) => {
  return (
    <div
      className="w-full flex flex-row justify-between items-center gap-4 p-2"
      style={{
        height: "160px",
        borderBottom: isLast ? "" : "2px solid #dbdddc",
      }}
    >
      <div className="flex flex-row gap-3">
        <Image
          width={160}
          height={160}
          src="/images/test.jpg"
          alt="product-image"
          style={{ border: "2px solid #c3c4c3" }}
          className="rounded-lg p-2"
        />
        <div className="flex flex-col justify-between items-start">
          <h3 className="text-stone-900 font-bold text-xl">
            عینک آفتابی Mariano
          </h3>
          <span className="text-stone-400 font-bold">1,290,000</span>
        </div>
      </div>
      <div className="h-full flex justify-center items-center ml-12">
        <button style={{ border: "2px solid #c3c4c3" }} className="rounded-lg p-0.5">
          <DeleteOutlineIcon className="w-7 h-7 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
