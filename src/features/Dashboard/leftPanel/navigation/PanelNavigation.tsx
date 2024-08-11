import { Link } from "react-router-dom";
import { panelItems } from "../../../../constants/panelNavItems";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { setIsNavOpen } from "../../../../slices/modals/modalSlice";

const PanelNavigation = () => {
  const dispatch = useAppDispatch();

  const handleCloseNav = () => {
    const currentWidth = window.innerWidth;

    if (currentWidth < 1024) {
      dispatch(setIsNavOpen(false));
    }
  };

  return (
    <ul className="flex flex-col gap-3">
      {panelItems.map((item, index) => {
        return (
          <li
            key={index}
            onClick={handleCloseNav}
            className="hover:text-azure-blue transition-colors ease-in duration-150"
          >
            <Link
              to={`${item.path}`}
              className="flex items-center gap-2 text-[18px] "
            >
              {item.icon} {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PanelNavigation;
