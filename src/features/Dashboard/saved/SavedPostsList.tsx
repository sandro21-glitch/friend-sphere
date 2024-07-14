import { UserPostTypes } from "../../../slices/posts/postsSlice";
import SingleSavedPost from "./SingleSavedPost";

type SavedPostTypes = {
  savedPosts: UserPostTypes[];
};

const SavedPostsList = ({ savedPosts }: SavedPostTypes) => {
  return (
    <ul className="p-4 flex flex-col gap-4">
      {savedPosts.map((post) => {
        return <SingleSavedPost key={post.postId} post={post} />;
      })}
    </ul>
  );
};

export default SavedPostsList;
