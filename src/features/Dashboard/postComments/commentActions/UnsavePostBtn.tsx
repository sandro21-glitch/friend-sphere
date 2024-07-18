import { BsBookmarkDashFill } from "react-icons/bs";
import ActionDropdown from "../../../../ui/ActionDropdown";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { unsavePostThunk } from "../../../../slices/posts/postThunks";

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
      <ActionDropdown
        dropdownText="Remove from saved"
        classnames="-top-10 right-[-155%]"
      />
    </button>
  );
};

export default UnsavePostBtn;
