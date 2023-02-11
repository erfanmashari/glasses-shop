import Drawer from "../Drawer"
import AddressesList from "./AddressesList"
import AddAddressForm from "./AddAddressForm"

const Addresses = () => {
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