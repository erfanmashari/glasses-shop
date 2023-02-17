import Drawer from "../Drawer"
import Favorites from "./FavoritesList"

const Favourites = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
        <Drawer />
        <Favorites />
    </main>
  )
}

export default Favourites