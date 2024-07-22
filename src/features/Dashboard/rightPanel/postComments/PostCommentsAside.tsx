import { useAppSelector } from "../../../../hooks/reduxHooks";
import SinglePostComment from "./SinglePostComment";

type PostCommentsAsideTypes = {
  postId: string;
};

const PostCommentsAside = ({ postId }: PostCommentsAsideTypes) => {
  const { groupById } = useAppSelector((store) => store.communities);

  // Find the specific post based on postId
  const post = groupById?.posts.find((post) => post.postId === postId);

  // Check if the post and its comments exist
  const postComments = post?.postComments;

  return (
    <div className="p-5">
      <h4 className="border-b-2 text-[1rem] pb-2 text-center font-medium mb-5">
        Recent Comments
      </h4>
      <ul>
        {postComments && postComments.length > 0 ? (
          postComments
            .slice()
            .reverse()
            .map((comment, index) => (
              <SinglePostComment key={index} comment={comment} />
            ))
        ) : (
          <p>No comments available</p>
        )}
      </ul>
    </div>
  );
};

export default PostCommentsAside;
