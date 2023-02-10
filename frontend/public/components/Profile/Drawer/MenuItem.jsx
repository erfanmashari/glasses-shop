import Link from "next/link";

import { useDispatch } from "react-redux";

import { changeLoginStatus } from "../../../redux/actions/login";

const MenuItem = ({ icon, title, href }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    if (title === "خروج") {
      setTimeout(() => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;

        dispatch(changeLoginStatus(false));
      }, 1000);
    }
  };

  return (
    <>
      {!href ? (
        <li className="w-full flex flex-row justify-start items-center text-stone-700 border-t-2 border-gray-200 cursor-pointer gap-1 p-3">
          <div className={`w-2/12 flex justify-center items-center`}>
            {icon}
          </div>
          <b>{title}</b>
        </li>
      ) : (
        <Link href={href}>
          <li
            onClick={() => logOut()}
            className="w-full flex flex-row justify-start items-center text-stone-700 border-t-2 border-gray-200 cursor-pointer gap-1 p-3"
          >
            <div className={`w-2/12 flex justify-center items-center`}>
              {icon}
            </div>
            <b>{title}</b>
          </li>
        </Link>
      )}
    </>
  );
};

export default MenuItem;
