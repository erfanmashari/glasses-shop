import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const NotificationsItem = ({ notification, index }) => {
  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">{index + 1}</td>
      <td className="text-stone-800 py-4">{notification.title}</td>
      <td className="text-blue-600 py-4">{notification.createdAt.split("T")[0]}</td>
      <td className="py-4">{notification.seen ? "دیده شده" : "دیده نشده"}</td>
      <td className="py-4 cursor-pointer">
        <DeleteOutlineOutlinedIcon className="text-red-600 block mx-auto" />
      </td>
    </tr>
  );
};

export default NotificationsItem;
