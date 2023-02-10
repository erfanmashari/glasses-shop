import { BsInfoCircleFill } from "react-icons/bs";

const FavouritesItem = () => {
  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">1</td>
      <td className="text-stone-800 py-4">هدست تسکو</td>
      <td className="py-4">ندارد</td>
      <td className="text-blue-600 py-4">50,000</td>
      <td className="py-4 cursor-pointer">
        <BsInfoCircleFill className="w-5 h-5 block mx-auto" />
      </td>
    </tr>
  );
};

export default FavouritesItem;
