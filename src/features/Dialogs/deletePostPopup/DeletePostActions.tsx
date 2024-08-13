import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setDeletePostModal } from "../../../slices/modals/modalSlice";
import { removePost } from "../../../slices/posts/postThunks";
import MiniLoadingSpinner from "../../../ui/MiniLoadingSpinner";

const DeletePostActions = () => {
  const removingPost = useAppSelector((store) => store.posts.loading.removing);
  const { dataIds } = useAppSelector((store) => store.modals.deletePostModal);

  const dispatch = useAppDispatch();

  const handleDeletePost = async () => {
    if (dataIds) {
      const { communityId, postId, userId } = dataIds;
      await dispatch(removePost({ communityId, postId, userId }));
      dispatch(setDeletePostModal({ dataIds: null, isModalOpen: false }));
    }
  };

  const handleCancel = () => {
    dispatch(setDeletePostModal({ dataIds: null, isModalOpen: false }));
  };

  return (
    <div className="flex items-center gap-5 ">
      <button
        type="button"
        onClick={handleCancel}
        className="border w-1/2 px-2 py-2 rounded-md text-gray-500 hover:bg-gray-200 text-[14px] transition-colors ease-in duration-150"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleDeletePost}
        className="border w-1/2 px-2 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-[14px] transition-colors ease-in duration-150"
      >
        {removingPost ? <MiniLoadingSpinner loading="Deleting..." /> : "Delete"}
      </button>
    </div>
  );
};

export default DeletePostActions;
