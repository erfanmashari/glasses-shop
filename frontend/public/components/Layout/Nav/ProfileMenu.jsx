import Link from "next/link";

import { useDispatch } from "react-redux";

import { changeLoginStatus } from "../../../redux/actions/login";

import { AiOutlineUser } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";

// import { cookiePaths } from "../../../config";

const ProfileMenu = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    // document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePaths}`;
    // document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePaths}`;

    dispatch(changeLoginStatus(false));
  };

  return (
    <div className="w-40 absolute top-9 right-0 flex flex-col text-slate-600 bg-white border-2 border-stone-300 rounded-lg gap-3 p-2.5 z-20">
      <Link href={"profile/"}>
        <button className="flex flex-row justify-start items-center border-b-2 border-slate-300 gap-2 pb-1.5">
          <AiOutlineUser className="w-6 h-6" />
          پروفایل
        </button>
      </Link>
      <div className="flex flex-row justify-start items-center border-b-2 border-slate-300 gap-2 pb-1.5">
        <GiMoneyStack className="w-6 h-6" />
        موجودی: 0
      </div>
      <button
        onClick={() => logOut()}
        className="flex flex-row justify-start items-center text-red-600 gap-2"
      >
        <BiLogOut className="w-6 h-6" />
        خروج
      </button>
    </div>
  );
};

export default ProfileMenu;
