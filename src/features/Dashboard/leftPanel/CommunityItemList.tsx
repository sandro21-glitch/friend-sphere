import { Link } from "react-router-dom";
import { communityItems } from "../../../constants/panelCommunityItems";

const CommunityItemList = () => {
  return (
    <ul className="flex flex-col gap-1">
      {communityItems.map((item, index) => {
        return (
          <li
            key={index}
            className="text-gray-600 hover:text-azure-blue transition-colors ease-in duration-150"
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CommunityItemList;
