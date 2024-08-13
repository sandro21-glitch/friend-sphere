import { useAppSelector } from "../../../hooks/reduxHooks";
import CommunityResults from "./results/CommunityResults";
import PostResults from "./results/PostResults";
import UserResults from "./results/UserResults";

const SearchResultsPanel = () => {
  const { communities, error, posts, status, users } = useAppSelector(
    (store) => store.search
  );

  if (status === "loading") {
    return (
      <div className="absolute top-full p-5 rounded-md left-0 right-0 w-full bg-white border shadow-lg z-[999999]">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full p-5 rounded-md left-0 right-0 w-full bg-white border shadow-lg z-[999999]">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-full px-5 py-1 rounded-md left-0 right-0 w-full
     bg-white border shadow-lg z-[999999] max-h-[30rem] overflow-y-scroll"
    >
      <div className="space-y-4 ">
        {/* Users */}
        {users.length > 0 && <UserResults users={users} />}

        {/* Communities */}
        {communities.length > 0 && (
          <CommunityResults communities={communities} />
        )}

        {/* Posts */}
        {posts.length > 0 && <PostResults posts={posts} />}

        {/* if no results found */}
        {users.length === 0 &&
          communities.length === 0 &&
          posts.length === 0 && (
            <div className="text-gray-500">No results found</div>
          )}
      </div>
    </div>
  );
};

export default SearchResultsPanel;
