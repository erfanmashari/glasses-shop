import Drawer from "../Drawer"
import NotificationsList from "./NotificationsList"

const Notifications = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
        <Drawer />
        <NotificationsList />
    </main>
  )
}

export default Notifications