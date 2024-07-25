import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchSinglePost } from "../../../slices/posts/postThunks";
import { useLocation } from "react-router-dom";
import PostCommentActions from "./PostCommentActions";
import PostCommentForm from "./PostCommentForm";
import PostCommentsHeader from "./PostCommentsHeader";
import PostCommentText from "./PostCommentText";
import DashboardPage from "../../../ui/DashboardPage";
import PageDataLoader from "../../../ui/PageDataLoader";
import ErrorMessage from "../../../ui/ErrorMessage";

const PostComments = () => {
  const {
    loading: { fetchingSinglePost },
    error: { fetchingSinglePostError },
    singlePost,
  } = useAppSelector((store) => store.posts);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const { postId, communityId } = location.state || {};

  useEffect(() => {
    if (postId && communityId) {
      dispatch(fetchSinglePost({ communityId, postId }));
    }
  }, [postId, communityId, dispatch]);

  if (fetchingSinglePost) {
    return <PageDataLoader />;
  }
  if (fetchingSinglePostError) {
    return <ErrorMessage message={fetchingSinglePostError || 'something went wrong... try again'} />;
  }

  if (!singlePost) {
    return <ErrorMessage message="Post not found" />;
  }

  const { userName, userPost, likedBy, postComments, createdAt, groupName } = singlePost;
  const postCommentLength = postComments ? postComments.length : 0;

  return (
    <DashboardPage>
      <div className="p-5">
        <PostCommentsHeader
          groupName={groupName}
          userName={userName}
          createdAt={createdAt}
          communityId={communityId}
        />
        <PostCommentText userPost={userPost} />
        <PostCommentActions
          likedBy={likedBy || []}
          postCommentLength={postCommentLength}
          postId={postId}
          communityId={communityId}
        />
        <PostCommentForm communityId={communityId} postId={postId} post={singlePost} />
      </div>
    </DashboardPage>
  );
};

export default PostComments;
