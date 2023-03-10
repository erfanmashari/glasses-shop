import { useDispatch } from "react-redux";

import axiosApp from "../../../utils/axiosApp";
import { checkFetchResponse, getTokenFromCookie } from "../../../functions";

import { setSelectedCommentInfo } from "../../../redux/actions/profile";

import { BsInfoCircleFill } from "react-icons/bs";

const CommentsItem = ({ comment, index, setCommentDetailsDisplay }) => {
  const dispatch = useDispatch();

  // get comment details from backend
  const getCommentDetailsFromBackend = () => {
    axiosApp
      .get(`comments/${comment._id}`, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          dispatch(setSelectedCommentInfo(res.data.comment));
          showCommentDetails();
        }
      });
  };

  // show comment deatils popup
  const showCommentDetails = () => {
    setCommentDetailsDisplay(true);
  };

  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">{index + 1}</td>
      <td className="text-stone-800 py-4">{comment.title}</td>
      <td className="text-blue-600 py-4">{comment.createdAt.split("T")[0]}</td>
      <td className="py-4">{comment.status}</td>
      <td className="py-4 cursor-pointer">
        <BsInfoCircleFill
          className="w-5 h-5 block mx-auto"
          onClick={getCommentDetailsFromBackend}
        />
      </td>
    </tr>
  );
};

export default CommentsItem;
