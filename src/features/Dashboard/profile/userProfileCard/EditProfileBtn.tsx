import { CiEdit } from "react-icons/ci";
import { GoTriangleDown } from "react-icons/go";
const EditProfileBtn = () => {
  return (
    <div className="flex justify-end w-full mb-5">
      <div className="relative group ">
        <CiEdit className="text-[25px] cursor-pointer" />
        <span
          className="absolute -top-9 -right-5 group-hover:block hidden w-fit text-nowrap
            text-[11px] bg-azure-blue px-1 py-2 rounded-md
             text-white opacity-0 group-hover:opacity-100 transition-all ease-in duration-200
            "
        >
          Edit profile
          <GoTriangleDown
            className="absolute -bottom-[13px] left-0
           right-0 w-full z-[99999] text-azure-blue text-[22px]"
          />
        </span>
      </div>
    </div>
  );
};

export default EditProfileBtn;
