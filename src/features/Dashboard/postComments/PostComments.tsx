import PostCommentActions from "./PostCommentActions";
import PostCommentsHeader from "./PostCommentsHeader";
import PostCommentText from "./PostCommentText";

const PostComments = () => {
  return (
    <section className="col-span-2 min-h-full h-full mt-5 bg-white rounded-lg border">
      <div className="p-5">
        <PostCommentsHeader />
        <PostCommentText />
        <PostCommentActions />
      </div>
    </section>
  );
};

export default PostComments;
