import DeletePostActions from "./DeletePostActions";
import { IoWarningOutline } from "react-icons/io5";
const DeletePostPopup = () => {
  return (
    <div className="w-[95vw] max-w-[24rem] min-w-[24rem] p-5 bg-white rounded-md ">
      <div className="w-full rounded-full flex items-center justify-center text-center mb-7">
        <div className="bg-red-200 p-1 rounded-full w-8 h-8 flex items-center justify-center">
          <IoWarningOutline className="text-[1.2rem]" />
        </div>
      </div>
      <h4 className="text-[1rem] text-center mb-7 font-medium leading-5">
        Are you sure you want to delete? <br /> This action cannot be undo.
      </h4>
      <DeletePostActions />
    </div>
  );
};

export default DeletePostPopup;
