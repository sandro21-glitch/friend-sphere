import { Link } from "react-router-dom";
import { PostSearchResult } from "../../../../slices/search/searchSlice";

interface PostResultTypes {
  posts: PostSearchResult[];
}
const PostResults = ({ posts }: PostResultTypes) => {
  return (
    <div>
      <h3 className="text-lg font-semibold my-2">Posts</h3>
      <ul className="cursor-pointer">
        {posts.map((post) => (
          <li key={post.postId}>
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
        ))}
      </ul>
    </div>
  );
};

export default PostResults;
