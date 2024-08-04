import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { parseBioText } from "../../../../utils/TextUtils";

const ProfileHeader: React.FC = () => {
  const { userData } = useAppSelector((store) => store.auth);

  const bio = userData?.bio || "Bio not added";

  return (
    <div className="flex justify-center items-center flex-col mb-3">
      <img
        src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
        alt="user image"
        className="w-[5.5rem] h-[5.5rem] mb-5"
      />
      <div className="flex items-center flex-col">
        <h2 className="text-[1.1rem] mb-1 font-semibold">{userData?.name}</h2>
        <p className="text-[14px] text-black flex items-center gap-1">
          <FaUserEdit />
          {parseBioText(bio)}
        </p>
        <hr />
      </div>
    </div>
  );
};

export default ProfileHeader;
