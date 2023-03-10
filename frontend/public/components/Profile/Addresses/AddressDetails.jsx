import EditAddressForm from "./EditAddressForm";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AddressDetails = ({ setAddressDetailsDisplay }) => {
  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <div
        className="w-8/12 flex flex-col bg-white rounded-lg overflow-y-scroll gap-4 p-6"
        style={{ maxHeight: "67%" }}
      >
        <div className="w-full flex flex-row justify-between ietms-center border-b-2 border-stone-200 pb-2">
          <h3 className="w-full text-lg font-bold text-stone-900">
            جزئیات دیدگاه
          </h3>
          <button onClick={() => setAddressDetailsDisplay(false)} type="button">
            <CloseOutlinedIcon />
          </button>
        </div>
        <EditAddressForm setAddressDetailsDisplay={setAddressDetailsDisplay} />
      </div>
    </div>
  );
};

export default AddressDetails;
