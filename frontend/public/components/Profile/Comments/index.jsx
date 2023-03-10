import Drawer from "../Drawer";
import CommentsList from "./CommentsList";
import CommentDetails from "./CommentDetails";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { resetSelectedCommentInfo } from "../../../redux/actions/profile";

const Comments = () => {
  const dispatch = useDispatch();

  // display comment details status
  const [commentDetailsDisplay, setCommentDetailsDisplay] = useState(false);

  useEffect(() => {
    dispatch(resetSelectedCommentInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
