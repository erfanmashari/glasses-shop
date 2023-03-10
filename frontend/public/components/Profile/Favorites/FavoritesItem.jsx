import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";

import axiosApp from "../../../utils/axiosApp";
import {
  checkFetchResponse,
  toastAlert,
  getUserInfo,
  getTokenFromCookie,
} from "../../../functions";

import { BsInfoCircleFill } from "react-icons/bs";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const FavoritesItem = ({ product, index }) => {
  const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // send delete favorite product request to backend
  const deleteFavorite = () => {
    axiosApp
      .delete(
        "favorites",
        {
          headers: {
            Authorization: getTokenFromCookie()
          },
          data: {
            user: personalInfo._id,
            product: product._id,
          }
        }
      )
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          getUserInfo(dispatch);
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">{index + 1}</td>
      <td className="text-stone-800 py-4">{product.nameFa}</td>
      <td className="text-blue-600 py-4">{product.category}</td>
      <td className="py-4">{product.price} تومان</td>
      <td className="py-4 cursor-pointer">
        <Link href={`/product/${product.nameFa}`}>
          <BsInfoCircleFill className="w-5 h-5 block mx-auto" />
        </Link>
      </td>
      <td className="py-4 cursor-pointer">
        <DeleteRoundedIcon
          className="w-7 h-7 text-red-600 block mx-auto"
          onClick={deleteFavorite}
        />
      </td>
    </tr>
  );
};

export default FavoritesItem;
