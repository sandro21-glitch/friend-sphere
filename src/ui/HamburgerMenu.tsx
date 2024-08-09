import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setIsNavOpen } from "../slices/modals/modalSlice";

const HamburgerMenu = () => {
  const [isOpen, setOpen] = useState<boolean>(window.innerWidth >= 1024);
  const dispatch = useAppDispatch();

  // Keep track of the previous window width
  const [prevWidth, setPrevWidth] = useState(window.innerWidth);

  const handleToggleNav = (toggled: boolean) => {
    setOpen(toggled);
    dispatch(setIsNavOpen(toggled));
  };

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth >= 1024 && prevWidth < 1024) {
        setOpen(true);
        dispatch(setIsNavOpen(true));
      } else if (currentWidth < 1024 && prevWidth >= 1024) {
        setOpen(false);
        dispatch(setIsNavOpen(false));
      }

      // update previous width
      setPrevWidth(currentWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [prevWidth, dispatch]);

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
