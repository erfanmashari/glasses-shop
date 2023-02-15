import Drawer from "../Drawer"
import AddressesList from "./AddressesList"
import AddAddressForm from "./AddAddressForm"

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  setAddressesListFromBackend
} from "../../../redux/actions/profile";

import axiosApp from "../../../utils/axiosConfig";
import { checkFetchResponse } from "../../../functions";

const Addresses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // get list of addresses from backend
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
      <Drawer />
      <div className='w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-8 px-16 py-12'>
        <AddressesList />
        <AddAddressForm />
      </div>
    </main>
  )
}

export default Addresses