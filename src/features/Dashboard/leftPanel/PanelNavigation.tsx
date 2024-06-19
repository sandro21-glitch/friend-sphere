import { Link } from "react-router-dom";
import { panelItems } from "../../../constants/panelNavItems";

const PanelNavigation = () => {
  return (
    <ul className="flex flex-col gap-3">
      {panelItems.map((item, index) => {
        return (
          <li
            key={index}
            className="hover:text-azure-blue transition-colors ease-in duration-150"
          >
            <Link
              to={`/dashboard/${item.path}`}
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
