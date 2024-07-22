import { BsBookmarkDashFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { unsavePostThunk } from "../../../../slices/posts/postThunks";
import Tooltip from "../../../../ui/Tooltip";

type UnsavePostBtnTypes = {
  postId: string;
  communityId: string;
  setIsPostSaved: (isSaved: boolean) => void;
};

const UnsavePostBtn = ({
  communityId,
  postId,
  setIsPostSaved,
}: UnsavePostBtnTypes) => {
  const userId = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const handleUnsavePost = () => {
    if (userId) {
      dispatch(unsavePostThunk({ communityId, postId, userId }));
      setIsPostSaved(false); // optimistically update UI
    }
  };

  return (
    <button
      type="button"
      onClick={handleUnsavePost}
      className="flex items-center gap-5 relative group"
    >
      <BsBookmarkDashFill className="text-[1.7rem]" />
      <Tooltip action={"Remove from saved"} />
    </button>
  );
};

export default UnsavePostBtn;
