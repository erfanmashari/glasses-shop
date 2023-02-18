import { BsInfoCircleFill } from "react-icons/bs";

const CommentsItem = ({ comment, index }) => {
  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">{index + 1}</td>
      <td className="text-stone-800 py-4">{comment.title}</td>
      <td className="text-blue-600 py-4">{comment.createdAt.split("T")[0]}</td>
      <td className="py-4">{comment.status}</td>
      <td className="py-4 cursor-pointer">
        <BsInfoCircleFill className="w-5 h-5 block mx-auto" />
      </td>
    </tr>
  );
};

export default CommentsItem;
