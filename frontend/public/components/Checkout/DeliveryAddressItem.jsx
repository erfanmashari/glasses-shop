import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const DeliveryAddressItem = ({ address }) => {
  return (
    <li
      className="flex flex-col justify-between items-start border-2 border-stone-400 rounded p-2"
      style={{ width: "32%", height: "200px" }}
    >
      <div className="w-full flex flex-row items-center border-b-2 border-stone-400 gap-2">
        <input type="radio" name="buy-order-address" />
        <label>ارسال به این آدرس</label>
      </div>
      <span>{address.postalAddress}</span>
      <span className="flex flex-row text-slate-600 gap-2">
        <PersonOutlineOutlinedIcon />
        {`${address.receiverSpecifications.firstName} ${address.receiverSpecifications.lastName}`}
      </span>
      <span className="flex flex-row text-slate-600 gap-2">
        <LocalPostOfficeOutlinedIcon />
        {address.postalCode}
      </span>
      <span className="flex flex-row text-slate-600 gap-2">
        <PhoneOutlinedIcon />
        {address.receiverSpecifications.phoneNumber}
      </span>
    </li>
  );
};

export default DeliveryAddressItem;
