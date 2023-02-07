import Header from "./Header";
import CategoriesList from "./CategoriesList";
import DiscountedProductsList from "./DiscountedProductsList";
import NewestProductsList from "./NewestProductsList";
import ReadingsList from "./ReadingsList";
import FollowInstagram from "./FollowInstagram";

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <CategoriesList />
      <DiscountedProductsList />
      <NewestProductsList />
      <NewestProductsList />
      <NewestProductsList />
      <ReadingsList />
      <FollowInstagram />
    </main>
  );
};

export default Home;
