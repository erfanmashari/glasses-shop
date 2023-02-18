import React from "react";

const CommentsItem = ({ comment }) => {
  return (
    <li className="w-full flex flex-col border-b-2 border-stone-200 gap-3 pb-4">
      <h2 className="text-xl font-bold text-stone-900">{comment.title}</h2>
      <p className="text-lg text-stone-600">{comment.description}</p>
      <div className="w-full flex flex-row text-stone-400 font-bold gap-3">
        {comment.createdAt.split("T")[0]} .{" "}
        {comment.unknown ? "کاربر فروشگاه" : comment.user.username}
      </div>
    </li>
  );
};

export default CommentsItem;
