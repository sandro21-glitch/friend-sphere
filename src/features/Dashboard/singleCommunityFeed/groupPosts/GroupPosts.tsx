import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import SingleGroupPost from "./SingleGroupPost";
import { fetchCommunityPosts, FetchCommunityPostsResult } from "../../../../slices/posts/postThunks";
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
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  useEffect(() => {
    if (communityId) {
      dispatch(
        fetchCommunityPosts({ communityId, offset: undefined, limit: 10 })
      )
      .unwrap()
      .then(() => {
        setInitialLoad(false); // Set initial load to false after the first fetch
      });
    }
  }, [dispatch, communityId]);

  const loadMorePosts = () => {
    if (offset) {
      dispatch(fetchCommunityPosts({ communityId, offset, limit: 10 }))
        .unwrap()
        .then((result: FetchCommunityPostsResult) => {
          const { posts } = result;
          if (posts.length > 0) {
            setOffset(posts[posts.length - 1].postId); // Update offset
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

  if (initialLoad && fetching) {
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
