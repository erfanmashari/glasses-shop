import Drawer from "../Drawer"
import FavouritesList from "./FavouritesList"

const Favourites = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
        <Drawer />
        <FavouritesList />
    </main>
  )
}

export default Favourites