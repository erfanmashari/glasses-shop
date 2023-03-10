import NotificationsItem from "./NotificationsItem";

import { useSelector } from "react-redux";

const NotificationsList = () => {
  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);
  const notifications = personalInfo.notifications ? personalInfo.notifications : [];

  return (
    <div className="w-9/12 flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg gap-4 p-6">
      <h3 className="w-full text-xl font-bold text-stone-800">پیغام ها</h3>
      <table className="w-full">
        <thead>
          <tr className="w-full text-stone-800 border-b-2 border-gray-200">
            <th className="w-1/12 py-4">ردیف</th>
            <th className="w-5/12 py-4">عنوان نظر</th>
            <th className="w-3/12 py-4">تاریخ ثبت</th>
            <th className="w-2/12 py-4">دیده شده</th>
            <th className="w-1/12 py-4">حذف</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <NotificationsItem key={index} notification={notification} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsList;
