import Image from "next/image";

const ImagesItem = ({ src }) => {
  return (
    <div
      className="w-full relative border-2 p-12"
      style={{ aspectRatio: "1 / 1" }}
    >
      <div className="w-full h-full relative">
        <Image
          fill={true}
          alt={"product image"}
          src={src}
        />
      </div>
    </div>
  );
};

export default ImagesItem;
