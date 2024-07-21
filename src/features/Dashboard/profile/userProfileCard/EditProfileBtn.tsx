import { CiEdit } from "react-icons/ci";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { setUpdateProfileModal } from "../../../../slices/modals/modalSlice";
import Tooltip from "../../../../ui/Tooltip";

const EditProfileBtn = () => {
  const dispatch = useAppDispatch();
  
  return (
    <div className="flex justify-end w-full mb-5 relative group">
      <div
        className="relative flex items-center justify-center"
        onClick={() => dispatch(setUpdateProfileModal(true))}
      >
        <CiEdit className="text-[25px] cursor-pointer" />
        <Tooltip action="Edit profile" />
      </div>
    </div>
  );
};

export default EditProfileBtn;
