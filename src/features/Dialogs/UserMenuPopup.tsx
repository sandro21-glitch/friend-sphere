import { IoIosLogOut } from "react-icons/io";

const UserMenuPopup = () => {
  return (
    <div className="absolute right-5 top-full pt-3 w-[18rem] z-[99999]  select-none">
      <div className="border p-2 bg-white rounded-md flex flex-col items-center">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user image"
          className="w-14 h-14 mb-2 cursor-pointer"
        />
        <h2 className="text-[16px] font-semibold cursor-pointer">Username</h2>
        <p className="text-gray-500 text-[14px]">demouser@socialecho.com</p>
        <hr />
        <button
          className="text-red-500 hover:text-red-700 transition-colors ease-in duration-200 mb-2 text-[14px]
        flex items-center gap-1"
        >
          Logout
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
};

export default UserMenuPopup;
