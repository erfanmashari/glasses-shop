import Image from "next/image";

import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const Home = () => {
  return (
    <main className="w-full flex flex-col">
      <header className="w-full flex flex-col justify-start items-center shadow-md p-8 gap-6" style={{ height: "500px", backgroundImage: "linear-gradient(to left, #ebebeb, #e6e6e6)" }}>
        <h1 className="text-5xl font-bold mt-24" style={{ color: "#161616" }}>فروشگاه عینک سی</h1>
        <p className="text-2xl" style={{ color: "#705c5c" }}>با عینک های سی دنیا را جای بهتری ببینید و زندگی شادتری داشته باشید!</p>
        <button className="mt-8"><ArrowDownwardOutlinedIcon className="w-12 h-12 text-blue-600" /></button>
        {/* <Image width={"100%"} alt="header-image" /> */}
      </header>
    </main>
  );
};

export default Home;
