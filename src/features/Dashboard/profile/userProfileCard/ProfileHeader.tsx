import { FaUserEdit } from "react-icons/fa";

const ProfileHeader = () => {
  return (
    <div className="flex justify-center items-center flex-col mb-10">
      <img
        src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
        alt="user image"
        className="w-[5.5rem] h-[5.5rem] mb-5"
      />
      <div className=" flex items-center flex-col">
        <h2 className="text-[1.1rem] mb-1 font-semibold">Username</h2>
        <p className="text-[14px] text-black flex items-center gap-1">
          <FaUserEdit />
          bio
        </p>
        <hr />
      </div>
    </div>
  );
};

export default ProfileHeader;
