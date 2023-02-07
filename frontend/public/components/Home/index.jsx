import Header from "./Header";
import CategoriesList from "./CategoriesList";
import DiscountedProductsList from "./DiscountedProductsList";

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <CategoriesList />
      <DiscountedProductsList />
    </main>
  );
};

export default Home;
