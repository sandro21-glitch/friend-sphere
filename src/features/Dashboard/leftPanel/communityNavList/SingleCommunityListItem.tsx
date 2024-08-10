import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { setIsNavOpen } from "../../../../slices/modals/modalSlice";

type SingleCommunityListItemTypes = {
  item: {
    name: string;
    uid: string;
  };
};

const SingleCommunityListItem = ({ item }: SingleCommunityListItemTypes) => {
  const dispatch = useAppDispatch();
  return (
    <li
      key={item.uid}
      onClick={() => dispatch(setIsNavOpen(false))}
      className="text-gray-600 hover:text-azure-blue text-[16px] transition-colors ease-in duration-150"
    >
      <Link to={`community/${item.name}`} state={{ id: item.uid }}>
        {item.name}
      </Link>
    </li>
  );
};

export default SingleCommunityListItem;
