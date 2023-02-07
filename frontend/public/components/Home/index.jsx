import Header from "./Header";
import CategoriesList from "./CategoriesList";

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <Header />
      <CategoriesList />
    </main>
  );
};

export default Home;
