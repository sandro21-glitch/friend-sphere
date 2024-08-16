import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setUserProfileModal } from "../../../slices/modals/modalSlice";
import LogoutBtn from "./LogoutBtn";

const UserMenuPopup: React.FC = () => {
  const { userData } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const popupRef = useRef<HTMLDivElement>(null);

  const handleClosePopup = () => {
    dispatch(setUserProfileModal(false));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClosePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={popupRef}
      className="absolute right-5 top-full pt-3 w-[18rem] z-[99999] select-none"
    >
      <div className="border p-2 bg-white rounded-md flex flex-col items-center">
        <Link to="/profile">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user image"
            className="w-14 h-14 mb-2 cursor-pointer"
            loading="lazy"
          />
        </Link>
        <Link to="/profile" className="text-center">
          <h2 className="text-[16px] font-semibold cursor-pointer hover:underline">
            {userData?.name}
          </h2>
          <p className="text-gray-500 text-[14px]">{userData?.email}</p>
        </Link>
        <hr />
        <LogoutBtn />
      </div>
    </div>
  );
};

export default UserMenuPopup;
