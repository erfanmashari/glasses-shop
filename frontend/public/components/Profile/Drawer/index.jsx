import Header from "./Header";
import MenuList from "./MenuList";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setProfilePersonalInfoFromBackend } from "../../../redux/actions/profile";
import { changeLoginStatus } from "../../../redux/actions/login";

import axiosApp from "../../../utils/axiosConfig";
import {
  checkFetchResponse,
  getPhoneNumberFromCookie,
} from "../../../functions";

const Drawer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = () => {
    const phoneNumber = getPhoneNumberFromCookie();
    if (phoneNumber) {
      axiosApp.get(`users/${phoneNumber}`).then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok && res.data.user) {
          dispatch(setProfilePersonalInfoFromBackend(res.data.user));
        } else {
          document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
          document.cookie = `phoneNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;

          dispatch(changeLoginStatus(false));

          const homePageLink = document.querySelector("#to-home-page-p");
          if (homePageLink) {
            homePageLink.click();
          }
        }
      });
    }
  };

  return (
    <aside className="w-3/12 flex flex-col border-l-2 border-stone-700 rounded-g px-6 pt-6">
      <Header />
      <MenuList />
    </aside>
  );
};

export default Drawer;
