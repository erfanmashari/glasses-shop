import Link from "next/link";

import { useSelector } from "react-redux";

import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";

const Header = () => {
  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  return (
    <Link href={"profile/"}>
      <header className="w-full flex flex-row justify-between items-center text-slate-600 cursor-pointer pb-3">
        <div className="flex flex-row justify-center items-center gap-3">
          <HiOutlineUserCircle className="w-12 h-12 text-stone-700" />
          <div className="flex flex-col justify-start items-center gap-1.5">
            <h3 className="font-bold text-lg text-stone-800">{personalInfo.username}</h3>
            <p className="text-sm">{personalInfo.phoneNumber}</p>
          </div>
        </div>
        <IoIosArrowBack className="w-6 h-6" />
      </header>
    </Link>
  );
};

export default Header;
