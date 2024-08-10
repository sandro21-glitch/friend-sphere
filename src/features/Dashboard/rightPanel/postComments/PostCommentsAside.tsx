import { useAppSelector } from "../../../../hooks/reduxHooks";
import PageDataLoader from "../../../../ui/PageDataLoader";
import SinglePostComment from "./SinglePostComment";

const PostCommentsAside = () => {
  const { singlePost } = useAppSelector((store) => store.posts);
  const { fetchingSinglePost } = useAppSelector((store) => store.posts.loading);

  if (fetchingSinglePost) {
    return <PageDataLoader />;
  }
  const postComments = singlePost?.postComments || [];

  return (
    <div
      className="p-5 bg-white col-span-2 lg:col-span-1 h-[85vh]
     sticky top-[5rem] border rounded-md "
    >
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
          <p className="text-center italic text-gray-500 text-[14px]">
            Be the first to comment
          </p>
        )}
      </ul>
    </div>
  );
};

export default PostCommentsAside;
