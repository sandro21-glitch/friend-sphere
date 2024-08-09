import UserMenuPopup from "../features/Dialogs/menuPopup/UserMenuPopup";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setUserProfileModal } from "../slices/modals/modalSlice";
import HamburgerMenu from "./HamburgerMenu";
import Input from "./Input";
import Logo from "./Logo";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  const { userProfileModal } = useAppSelector((store) => store.modals);
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(setUserProfileModal(!userProfileModal));
  };

  return (
    <header className="p-[.5rem] border-b bg-white sticky inset-0 z-[999999]">
      <nav className="section-center section-x flex items-center justify-between gap-10 relative">
        <Logo height="2.5rem" />
        <HamburgerMenu />
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search for people, posts or communities"
          className="max-w-[660px] py-2 rounded-full text-[14px]"
        />
        <FaUserCircle
          className="min-w-7 min-h-7 cursor-pointer text-gray-400"
          onClick={handleOpenModal}
        />
        {userProfileModal && <UserMenuPopup />}
      </nav>
    </header>
  );
};

export default Navbar;
