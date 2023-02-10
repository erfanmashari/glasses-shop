import Header from "./Header"
import MenuList from "./MenuList"

const Drawer = () => {
  return (
    <aside className='w-3/12 flex flex-col border-l-2 border-stone-700 rounded-g px-6 pt-6'>
        <Header />
        <MenuList />
    </aside>
  )
}

export default Drawer