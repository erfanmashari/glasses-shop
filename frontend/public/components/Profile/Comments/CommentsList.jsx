import CommentsItem from "./CommentsItem";

import { useSelector } from "react-redux";

const CommentsList = ({ setCommentDetailsDisplay }) => {
  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);
  const comments = personalInfo.comments ? personalInfo.comments : [];

  return (
    <div className="w-9/12 flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg gap-4 p-6">
      <h3 className="w-full text-xl font-bold text-stone-800">نظرات</h3>
      <table className="w-full">
        <thead>
          <tr className="w-full text-stone-800 border-b-2 border-gray-200">
            <th className="w-1/12 py-4">ردیف</th>
            <th className="w-5/12 py-4">عنوان نظر</th>
            <th className="w-3/12 py-4">تاریخ ثبت</th>
            <th className="w-2/12 py-4">وضعیت</th>
            <th className="w-1/12 py-4">اطلاعات</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <CommentsItem
              key={index}
              comment={comment}
              index={index}
              setCommentDetailsDisplay={setCommentDetailsDisplay}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsList;
