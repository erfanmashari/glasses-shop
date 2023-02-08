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
      <NewestProductsList categoryFa={"عینک طبی"} categoryEn={"eyeGlasses"}  />
      <NewestProductsList categoryFa={"عینک کامپیوتر"} categoryEn={"screenGlasses"} />
      <NewestProductsList categoryFa={"عینک آفتابی"} categoryEn={"sunGlasses"} />
      <ReadingsList />
      <FollowInstagram />
    </main>
  );
};

export default Home;
