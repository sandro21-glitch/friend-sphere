import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addCommentToPost } from "../../../slices/posts/postThunks";

type PostCommentFormProps = {
  communityId: string;
  postId: string;
};

const PostCommentForm = ({ communityId, postId }: PostCommentFormProps) => {
  const [userComment, setUserComment] = useState<string>("");
  const commenting = useAppSelector((store) => store.posts.loading.commenting);
  const { name, uid } = useAppSelector((store) => store.auth.userData) || {};

  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userComment === "") return;
    if (name && uid) {
      dispatch(
        addCommentToPost({
          postComment: {
            userComment,
            userId: uid,
            userName: name,
            postedAt: new Date().toISOString(),
          },
          communityId,
          postId,
        })
      );
      setUserComment("");
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleAddComment}>
      <textarea
        id="comment"
        placeholder="Write a comment..."
        value={userComment}
        onChange={handleCommentChange}
        className="p-2 border rounded-md mb-5 resize-none h-[4rem]
         focus:border-azure-blue outline-none transition-all ease-in duration-150"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={commenting}
          className={`bg-azure-blue px-5 py-2 text-white
             rounded-md text-[.8rem] hover:bg-deep-blue transition-colors
              ease-in duration-150 ${
                commenting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
        >
          {commenting ? "Loading..." : "Comment"}
        </button>
      </div>
    </form>
  );
};

export default PostCommentForm;
