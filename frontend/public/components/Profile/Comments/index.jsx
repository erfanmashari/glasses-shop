import Drawer from "../Drawer";
import CommentsList from "./CommentsList";
import CommentDetails from "./CommentDetails";

import { useState } from "react";

const Comments = () => {
  // display comment details status
  const [commentDetailsDisplay, setCommentDetailsDisplay] = useState(false);

  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
      <Drawer />
      <CommentsList setCommentDetailsDisplay={setCommentDetailsDisplay} />
      {commentDetailsDisplay ? (
        <CommentDetails setCommentDetailsDisplay={setCommentDetailsDisplay} />
      ) : (
        ""
      )}
    </main>
  );
};

export default Comments;
