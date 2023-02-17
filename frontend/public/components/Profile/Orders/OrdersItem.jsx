import { BsInfoCircleFill } from "react-icons/bs";

const OrdersItem = ({ order }) => {
  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">1</td>
      <td className="text-stone-800 py-4">{order.status}</td>
      <td className="py-4">{order.totalPrice} تومان</td>
      <td className="text-lime-600 py-4">{order.createdAt.split("T")[0]}</td>
      <td className="py-4 text-blue-600">{order.trackingCode}</td>
      <td className="py-4 cursor-pointer">
        <BsInfoCircleFill className="w-5 h-5 block mx-auto" />
      </td>
    </tr>
  );
};

export default OrdersItem;
