import { useAppSelector } from "../../../../hooks/reduxHooks";
import SinglePostComment from "./SinglePostComment";

type PostCommentsAsideTypes = {
  postId: string;
};

const PostCommentsAside = ({ postId }: PostCommentsAsideTypes) => {
  const { communityPosts, savedPosts } = useAppSelector((store) => store.posts);

  const findPostWithComments = (postId: string) => {
    let postWithComments = communityPosts?.find(
      (post) => post.postId === postId
    );

    if (!postWithComments) {
      postWithComments = savedPosts?.find((post) => post.postId === postId);
    }

    return postWithComments?.postComments || [];
  };

  // get the post comments
  const postComments = findPostWithComments(postId);

  return (
    <div className="p-5">
      <h4 className="border-b-2 text-[1rem] pb-2 text-center font-medium mb-5">
        Recent Comments
      </h4>
      <ul>
        {postComments.length > 0 ? (
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
