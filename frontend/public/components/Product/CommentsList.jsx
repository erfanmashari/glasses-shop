import CommentsItem from "./CommentsItem";

import { useSelector } from "react-redux";

const CommentsList = () => {
  // get product info from redux/reducers/product/productInfo.js
  const productInfo = useSelector((state) => state.productInfo);
    console.log("productInfo: ", productInfo.comments)
  return (
    <ul className="w-9/12 flex flex-col gap-3 px-4">
      {productInfo.comments.map((comment, index) => (
        <CommentsItem key={index} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentsList;
