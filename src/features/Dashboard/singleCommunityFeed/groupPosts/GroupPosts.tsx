import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import SingleGroupPost from "./SingleGroupPost";
import { fetchCommunityPosts } from "../../../../slices/posts/postThunks";
import LoadPostsBtn from "./LoadPostsBtn";

type GroupPostTypes = {
  communityId: string;
  offset: string | undefined;
  setOffset: (offset: string) => void;
};

const GroupPosts = ({ communityId, offset, setOffset }: GroupPostTypes) => {
  const {
    communityPosts: posts,
    loading: { fetching },
  } = useAppSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (communityId) {
      dispatch(
        fetchCommunityPosts({ communityId, offset: undefined, limit: 10 })
      );
    }
  }, [dispatch, communityId]);

  const loadMorePosts = () => {
    if (offset) {
      dispatch(fetchCommunityPosts({ communityId, offset, limit: 10 }))
        .unwrap()
        .then((fetchedPosts) => {
          if (fetchedPosts.length > 0) {
            setOffset(fetchedPosts[fetchedPosts.length - 1].postId); // Update offset
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };

    // Sort posts by `createdAt` in descending order (newest first)
    const sortedPosts = posts ? [...posts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    }) : [];

  if (fetching) {
    return (
      <div className="py-5 px-2 text-center flex items-center justify-center gap-3">
        <p className="text-gray-500 italic">Loading posts</p>
        <div className="w-5 h-5 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-5 px-2 text-center">
        <p className="text-gray-500 italic">
          No posts available. Be the first to post!
        </p>
      </div>
    );
  }

  return (
    <div className="py-5 px-2">
      <ul className="flex flex-col gap-5">
        {sortedPosts.map((post) => (
            <SingleGroupPost
              key={post.postId}
              post={post}
              communityId={communityId}
            />
          ))}
      </ul>
      <LoadPostsBtn loadPosts={loadMorePosts} fetching={fetching} />
    </div>
  );
};

export default GroupPosts;
