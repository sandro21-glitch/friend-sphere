import { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PanelCommunities from "./communityNavList/PanelCommunities";
import PanelNavigation from "./navigation/PanelNavigation";
import SuggestedGroupsMobile from "./SuggestedGroupsMobile";

const LeftPanel = () => {
  const { isNavOpen } = useAppSelector((store) => store.modals);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const disableScrollClose = (event: Event) => {
      // Prevent state changes due to scroll when nav is open
      if (isNavOpen) {
        event.stopPropagation();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", disableScrollClose, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", disableScrollClose, true);
    };
  }, [isNavOpen]);

  return (
    <div
      className={`col-span-1 fixed z-[99999] lg:z-auto w-[65%] sm:w-[50%] lg:w-auto left-0 lg:sticky lg:left-auto top-[5rem] border rounded-md py-5 bg-white ${
        isNavOpen ? "block" : "hidden"
      }`}
      style={{
        height: "85vh",
        overflowY: "auto",
      }}
    >
      <div className="px-5">
        <PanelNavigation />
        <hr />
        <PanelCommunities />
        {windowWidth < 1024 && (
          <>
            <hr />
            <SuggestedGroupsMobile />
          </>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
