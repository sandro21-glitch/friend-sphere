import { Link } from "react-router-dom";

type SingleCommunityListItemTypes = {
  item: {
    name: string;
    uid: string;
  };
};

const SingleCommunityListItem = ({ item }: SingleCommunityListItemTypes) => {
  return (
    <li
      key={item.uid}
      className="text-gray-600 hover:text-azure-blue text-[16px] transition-colors ease-in duration-150"
    >
      <Link to={`community/${item.name}`} state={{ id: item.uid }}>
        {item.name}
      </Link>
    </li>
  );
};

export default SingleCommunityListItem;
