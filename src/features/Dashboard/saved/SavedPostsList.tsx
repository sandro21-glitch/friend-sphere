import { SavedPostTypes } from "../../../slices/posts/postsSlice";
import SingleSavedPost from "./SingleSavedPost";

type SavedPostListTypes = {
  savedPosts: SavedPostTypes[];
};

const SavedPostsList = ({ savedPosts }: SavedPostListTypes) => {
  return (
    <ul className="p-4 flex flex-col gap-4">
      {savedPosts
        .slice()
        .reverse()
        .map((post) => {
          return <SingleSavedPost key={post.postId} post={post} />;
        })}
    </ul>
  );
};

export default SavedPostsList;
