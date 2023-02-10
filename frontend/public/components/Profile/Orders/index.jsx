import Drawer from "../Drawer"
import OrdersList from "./OrdersList"

const Orders = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
        <Drawer />
        <OrdersList />
    </main>
  )
}

export default Orders