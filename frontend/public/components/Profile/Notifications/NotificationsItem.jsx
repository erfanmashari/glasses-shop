import { useSelector, useDispatch } from "react-redux";

import axiosApp from "../../../utils/axiosApp";
import {
  checkFetchResponse,
  toastAlert,
  getTokenFromCookie,
  getUserInfo,
} from "../../../functions";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

const NotificationsItem = ({ notification, index }) => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // send edit address info request to backend
  const editAddress = (e) => {
    e.preventDefault();

    const reqData = {
      id: notification._id,
    };
    axiosApp
      .put("notifications/seen", reqData, {
        headers: { Authorization: getTokenFromCookie() },
      })
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

  // send delete address request to backend
  const deleteAddress = () => {
    axiosApp
      .delete("notifications", {
        headers: {
          Authorization: getTokenFromCookie(),
        },
        data: {
          id: notification._id,
          user: personalInfo._id,
        },
      })
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
      <td className="text-stone-800 py-4">{notification.title}</td>
      <td className="text-blue-600 py-4">
        {notification.createdAt.split("T")[0]}
      </td>
      <td className="py-4">
        {notification.isSeen ? (
          <DoneAllRoundedIcon className="text-yellow-400" />
        ) : (
          <DoneRoundedIcon className="cursor-pointer" onClick={editAddress} />
        )}
      </td>
      <td className="py-4 cursor-pointer">
        <DeleteOutlineOutlinedIcon
          className="text-red-600 block mx-auto"
          onClick={deleteAddress}
        />
      </td>
    </tr>
  );
};

export default NotificationsItem;
