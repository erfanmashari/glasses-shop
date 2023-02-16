import DeliveryAddressItem from "./DeliveryAddressItem";

import { useSelector } from "react-redux";

const DeliveryAddressList = () => {
  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);
  const addresses = personalInfo.addresses ? personalInfo.addresses : [];

  return (
    <div
      className="w-full flex flex-col justify-start items-start rounded-md gap-6 p-4"
      style={{ border: "2px solid #dbdddc" }}
    >
      <h3 className="font-bold">آدرس تحویل سفارش را انتخاب کنید</h3>
      <ul className="w-full flex flex-row gap-4">
        {addresses.map((address, index) => (
          <DeliveryAddressItem key={index} address={address} />
        ))}
      </ul>
    </div>
  );
};

export default DeliveryAddressList;
