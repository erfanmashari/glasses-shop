import Link from "next/link";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TitleSide = () => {
  return (
    <div className="w-5/12 h-full relative flex flex-col justify-center items-center text-stone-100 gap-4">
      <Link href={"/login"} className="absolute top-6 left-6">
        <ArrowBackIcon className="w-8 h-8" />
      </Link>
      <h2 className="text-2xl font-bold">ثبت نام در فروشگاه</h2>
      <h2 className="text-lg font-bold text-stone-300">فروشگاه سی شاپ</h2>
    </div>
  );
};

export default TitleSide;
