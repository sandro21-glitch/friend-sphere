import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setIsNavOpen } from "../slices/modals/modalSlice";

const HamburgerMenu = () => {
  const isNavOpen = useAppSelector((state) => state.modals.isNavOpen);
  const [isOpen, setOpen] = useState<boolean>(window.innerWidth >= 1024);
  const dispatch = useAppDispatch();

  const handleToggleNav = (toggled: boolean) => {
    setOpen(toggled);
    dispatch(setIsNavOpen(toggled));
  };

  useEffect(() => {
    setOpen(isNavOpen);
  }, [isNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth >= 1024) {
        setOpen(true);
        dispatch(setIsNavOpen(true));
      } else {
        setOpen(false);
        dispatch(setIsNavOpen(false));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false);
      dispatch(setIsNavOpen(false));
    }
  }, [dispatch]);

  return (
    <div className="lg:hidden flex items-center justify-center">
      <Hamburger
        onToggle={handleToggleNav}
        toggled={isOpen}
        toggle={setOpen}
        size={20}
      />
    </div>
  );
};

export default HamburgerMenu;
