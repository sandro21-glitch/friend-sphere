import { useAppSelector } from "../../../../hooks/reduxHooks";
import SinglePostComment from "./SinglePostComment";

type PostCommentsAsideTypes = {
  postId: string;
};

const PostCommentsAside = ({ postId }: PostCommentsAsideTypes) => {
  const postComments = useAppSelector(
    (store) =>
      store.posts.communityPosts?.find((post) => post.postId === postId)
        ?.postComments
  );

  return (
    <div className="p-5">
      <h4 className="border-b-2 text-[1rem] pb-2 text-center font-medium mb-5">
        Recent Comments
      </h4>
      <ul>
        {postComments &&
          postComments.length > 0 &&
          postComments
            .slice()
            .reverse()
            .map((comment, index) => {
              return <SinglePostComment key={index} comment={comment} />;
            })}
      </ul>
    </div>
  );
};

export default PostCommentsAside;
