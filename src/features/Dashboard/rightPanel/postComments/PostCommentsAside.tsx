import { useAppSelector } from "../../../../hooks/reduxHooks";
import PageLoader from "../../../../ui/PageLoader";
import SinglePostComment from "./SinglePostComment";

const PostCommentsAside = () => {
  const { singlePost } = useAppSelector((store) => store.posts);
  const { fetchingSinglePost } = useAppSelector((store) => store.posts.loading);

  if (fetchingSinglePost) {
    return (
      <article className="col-span-1 min-h-[85vh] w-full mt-5 bg-white">
        <div className="flex items-center justify-center h-full">
          <PageLoader />
        </div>
      </article>
    );
  }
  const postComments = singlePost?.postComments || [];

  return (
    <div
      className="p-5 bg-white col-span-2 lg:col-span-1 h-fit lg:h-[85vh]
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
