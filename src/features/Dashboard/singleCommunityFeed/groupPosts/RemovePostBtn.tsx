import { GoTriangleDown } from "react-icons/go";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { setDeletePostModal } from "../../../../slices/modals/modalSlice";

type RemovePostBtnTypes = {
  postUserId: string;
  communityId: string;
  postId: string;
};

const RemovePostBtn = ({
  postUserId,
  communityId,
  postId,
}: RemovePostBtnTypes) => {
  const currentUserId = useAppSelector((store) => store.auth.userData?.uid);
  if (currentUserId !== postUserId) return null;

  const dispatch = useAppDispatch();

  const handleRemovePost = () => {
    dispatch(
      setDeletePostModal({
        isModalOpen: true,
        dataIds: { communityId, postId, userId: postUserId },
      })
    );
  };


  return (
    <button type="button" onClick={handleRemovePost} className="relative group">
      <RiDeleteBin3Line className="text-red-600 text-[1.5rem]" />
      <span
        className="absolute -top-9 -left-[26px] group-hover:block hidden w-fit text-nowrap
            text-[11px] bg-azure-blue px-2 py-1 rounded-md
            text-white opacity-0 group-hover:opacity-100 transition-all ease-in duration-200
            "
      >
        Delete Post
        <GoTriangleDown
          className="absolute -bottom-[13px]  left-0
           right-0 w-full z-[99999] text-azure-blue text-[22px]"
        />
      </span>
    </button>
  );
};

export default RemovePostBtn;
