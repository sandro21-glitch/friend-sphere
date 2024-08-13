import { Link } from "react-router-dom";
import { PostSearchResult } from "../../../../slices/search/searchSlice";
import { useAppSelector } from "../../../../hooks/reduxHooks";

interface PostResultTypes {
  posts: PostSearchResult[];
  onPostClick: () => void;
}

const PostResults = ({ posts, onPostClick }: PostResultTypes) => {
  // Get userGroups from the Redux store
  const userGroups = useAppSelector((store) => store.communities.userGroups);

  // Filter posts to only show those where the communityId is included in userGroups
  const filteredPosts = posts.filter((post) =>
    userGroups?.some((group) => group.uid === post.communityId)
  );

  return (
    <div>
      <h3 className="text-lg font-semibold my-2">Posts</h3>
      <ul className="cursor-pointer">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.postId} onClick={onPostClick}>
              <Link
                to={`post/${post.postId}`}
                state={{
                  communityId: post.communityId,
                  postId: post.postId,
                }}
                className="mb-2 pb-2 border-b block"
              >
                <div className="flex items-center">
                  <img
                    src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                    alt="user image"
                    className="w-10 h-10"
                  />
                  <div>
                    <p className="text-[13px] text-gray-500">
                      {post.userPost.length > 70
                        ? `${post.userPost.slice(0, 70)}...`
                        : post.userPost}
                    </p>
                    <p className="text-[13px] text-gray-500 font-medium">
                      Posted by {post.userName} in {post.communityName}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div className="text-gray-500 py-5">No results found</div>
        )}
      </ul>
    </div>
  );
};

export default PostResults;
