import { BsBookmark } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { savePostThunk } from "../../../../slices/posts/postThunks";
import Tooltip from "../../../../ui/Tooltip";

type SavePostBtnTypes = {
  isPostSaved: boolean;
  postId: string;
  communityId: string;
  setIsPostSaved: (isSaved: boolean) => void;
};

const SavePostBtn = ({
  communityId,
  isPostSaved,
  postId,
  setIsPostSaved,
}: SavePostBtnTypes) => {
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const {
    loading: { saving },
  } = useAppSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  const handleSavePost = () => {
    if (isPostSaved) {
      alert("This post is already saved.");
      return;
    }
    if (userId && postId && communityId) {
      dispatch(savePostThunk({ userId, postId, communityId }));
      setIsPostSaved(true); // Optimistically update UI
    }
  };

  return (
    <button
      type="button"
      onClick={handleSavePost}
      className={` flex items-center gap-5 relative group ${
        saving ? "cursor-wait" : "cursor-pointer"
      }`}
      disabled={saving}
    >
      <div className="">
        <BsBookmark className="text-[1.7rem]" />
      </div>
      <Tooltip action={saving ? "Loading..." : "Save post"} />
    </button>
  );
};

export default SavePostBtn;
