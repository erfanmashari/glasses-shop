import AddressesItem from "./AddressesItem";

import { useSelector } from "react-redux";

const AddressesList = ({ setAddressDetailsDisplay }) => {
  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  return (
    <>
      <h3 className="w-full text-xl font-bold text-stone-800">آدرس ها</h3>
      <table className="w-full">
        <thead>
          <tr className="w-full text-stone-800 border-b-2 border-gray-200">
            <th className="w-1/12 py-4">ردیف</th>
            <th className="w-9/12 py-4">نشانی پستی</th>
            <th className="w-2/12 py-4">اطلاعات و ویرایش</th>
          </tr>
        </thead>
        <tbody>
          {personalInfo.addresses &&
            personalInfo.addresses.map((address, index) => (
              <AddressesItem
                key={index}
                address={address}
                number={index + 1}
                setAddressDetailsDisplay={setAddressDetailsDisplay}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AddressesList;
