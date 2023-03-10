import { useDispatch } from "react-redux";

import { setSelectedAddressInfo } from "../../../redux/actions/profile";

import EditIcon from "@mui/icons-material/Edit";

const AddressesItem = ({ address, number, setAddressDetailsDisplay }) => {
  const dispatch = useDispatch();

  // set address info in redux
  const setSelectedAddress = () => {
    dispatch(setSelectedAddressInfo(address));
    showAddressDetails();
  };

  // show address deatils popup
  const showAddressDetails = () => {
    setAddressDetailsDisplay(true);
  };

  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">{number}</td>
      <td className="text-stone-800 py-4">{address.postalAddress}</td>
      <td className="py-4 cursor-pointer">
        <EditIcon
          className="w-5 h-5 block mx-auto"
          onClick={setSelectedAddress}
        />
      </td>
    </tr>
  );
};

export default AddressesItem;
