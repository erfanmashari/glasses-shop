// import components
import Header from "./Header"
import ProductsList from "./ProductsList"

const Nav = () => {
  return (
    <nav className="w-full flex flex-col">
        <Header />
        <ProductsList />
    </nav>
  )
}

export default Nav