import ImagesItem from "./ImagesItem";

import { useSelector } from "react-redux";

const ImagesList = () => {
  const productInfo = useSelector((state) => state.productInfo);

  return (
    <div className="w-2/3 grid grid-cols-2 gap-4 mt-4">
      {productInfo.images.map((image, index) => (
        <ImagesItem
          key={index}
          src={`${process.env.NEXT_PUBLIC_SERVER}products/${image.fileName}.jpg`}
        />
      ))}
    </div>
  );
};

export default ImagesList;
