import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUserProfileModal } from "../../slices/modals/modalSlice";

const UserMenuPopup = () => {
  const dispatch = useAppDispatch();
  const handleClosePopup = () => {
    dispatch(setUserProfileModal(false));
  };

  return (
    <div
      onClick={handleClosePopup}
      className="absolute right-5 top-full pt-3 w-[18rem] z-[99999]  select-none"
    >
      <div className="border p-2 bg-white rounded-md flex flex-col items-center">
        <Link to="/profile">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user image"
            className="w-14 h-14 mb-2 cursor-pointer"
          />
        </Link>
        <Link to="/profile" className="text-center">
          <h2 className="text-[16px] font-semibold cursor-pointer">Username</h2>
          <p className="text-gray-500 text-[14px]">demouser@socialecho.com</p>
        </Link>
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
