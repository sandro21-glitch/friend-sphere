import PostCommentActions from "./PostCommentActions";
import PostCommentForm from "./PostCommentForm";
import PostCommentsHeader from "./PostCommentsHeader";
import PostCommentText from "./PostCommentText";

const PostComments = () => {
  return (
    <section className="col-span-2 max-h-[85vh] h-full mt-5 bg-white rounded-lg border">
      <div className="p-5">
        <PostCommentsHeader />
        <PostCommentText />
        <PostCommentActions />
        <PostCommentForm />
      </div>
    </section>
  );
};

export default PostComments;
