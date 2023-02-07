import Header from "./Header";
import CategoriesList from "./CategoriesList";
import DiscountedProductsList from "./DiscountedProductsList";
import NewestProductsList from "./NewestProductsList";

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <CategoriesList />
      <DiscountedProductsList />
      <NewestProductsList />
      <NewestProductsList />
      <NewestProductsList />
    </main>
  );
};

export default Home;
