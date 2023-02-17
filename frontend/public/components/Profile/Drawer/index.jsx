import Header from "./Header";
import MenuList from "./MenuList";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getUserInfo } from "../../../functions";

const Drawer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo(document.querySelector("#to-home-page-p"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className="w-3/12 flex flex-col border-l-2 border-stone-700 rounded-g px-6 pt-6">
      <Header />
      <MenuList />
    </aside>
  );
};

export default Drawer;
