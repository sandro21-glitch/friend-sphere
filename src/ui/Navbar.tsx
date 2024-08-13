import { useEffect, useState } from "react";
import UserMenuPopup from "../features/Dialogs/menuPopup/UserMenuPopup";
import SearchResultsPanel from "../features/Dialogs/searchPanel/SearchResultsPanel";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setUserProfileModal } from "../slices/modals/modalSlice";
import HamburgerMenu from "./HamburgerMenu";
import Input from "./Input";
import Logo from "./Logo";
import { FaUserCircle } from "react-icons/fa";
import { searchAll } from "../slices/search/searchThunks";
const Navbar = () => {
  const { userProfileModal } = useAppSelector((store) => store.modals);
  const dispatch = useAppDispatch();
  const handleOpenModal = () => {
    dispatch(setUserProfileModal(!userProfileModal));
  };

  const { status } = useAppSelector((store) => store.search);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchAll(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <header className="p-[.5rem] border-b bg-white sticky inset-0 z-[999999]">
      <nav className="section-center section-x flex items-center justify-between gap-10 relative">
        <Logo height="2.5rem" />
        <HamburgerMenu />
        <div className="w-full max-w-[660px] static md:relative">
          <Input
            id="search"
            name="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for people, posts or communities"
            className="w-full py-2 rounded-full text-[14px]"
          />
          {searchQuery && status !== "loading" && <SearchResultsPanel />}
        </div>
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
