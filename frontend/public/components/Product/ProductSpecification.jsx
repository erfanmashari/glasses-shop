import React from "react";

const ProductSpecification = ({ label, value }) => {
  return (
    <>
      {value && (
        <li className="w-full flex flex-row justify-center items-center">
          <span className="w-2/12" style={{ color: "#767790" }}>
            {label}
          </span>
          <div className="w-10/12 flex flex-row justify-start items-center">
            {Array.isArray(value) ? (
              value.map((spec, index) => (
                <span
                  key={index}
                  className="font-bold"
                  style={{ color: "#23254e" }}
                >
                  {spec}
                  {index !== value.length - 1 && ","}{" "}
                </span>
              ))
            ) : (
              <span className="font-bold" style={{ color: "#23254e" }}>
                {value}
              </span>
            )}
          </div>
        </li>
      )}
    </>
  );
};

export default ProductSpecification;
