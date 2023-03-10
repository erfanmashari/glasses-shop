import Drawer from "../Drawer";
import AddressesList from "./AddressesList";
import AddAddressForm from "./AddAddressForm";
import AddressDetails from "./AddressDetails";

import { useState } from "react";

const Addresses = () => {
  // display address details status
  const [addressDetailsDisplay, setAddressDetailsDisplay] = useState(false);

  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
      <Drawer />
      <div className="w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-8 px-16 py-12">
        <AddressesList setAddressDetailsDisplay={setAddressDetailsDisplay} />
        <AddAddressForm />
      </div>
      {addressDetailsDisplay ? (
        <AddressDetails setAddressDetailsDisplay={setAddressDetailsDisplay} />
      ) : (
        ""
      )}
    </main>
  );
};

export default Addresses;
