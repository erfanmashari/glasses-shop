import MenuItem from "./MenuItem";

import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { TbAddressBook } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

const MenuList = () => {
  return (
    <ul className="w-full flex flex-col">
      <MenuItem
        icon={<FiShoppingCart className="w-6 h-6" />}
        title={"سفارش ها"}
        href={"orders"}
      />
      <MenuItem
        icon={<MdFavoriteBorder className="w-6 h-6 relative left-1" />}
        title={"مورد علاقه ها"}
        href={"favorites"}
      />
      <MenuItem
        icon={<FaRegComment className="w-5 h-5 relative left-1.5" />}
        title={"دیدگاه ها"}
        href={"comments"}
      />
      <MenuItem
        icon={<TbAddressBook className="w-6 h-6 relative left-1" />}
        title={"آدرس ها"}
        href={"addresses"}
        />
      <MenuItem
        icon={
          <IoMdNotificationsOutline className="w-6 h-6 relative left-1.5" />
        }
        title={"پیغام ها"}
        href={"notifications"}
      />
      <MenuItem
        icon={<RiLockPasswordLine className="w-6 h-6 relative left-1.5" />}
        title={"تغییر رمزعبور"}
      />
      <MenuItem
        icon={<BiLogOut className="w-6 h-6 relative left-1" />}
        title={"خروج"}
        href={"/"}
      />
    </ul>
  );
};

export default MenuList;
