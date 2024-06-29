import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import SmallSpinner from "../../../../ui/SmallSpinner";


const CommunityItemList = () => {
  const {
    communityData,
    joinedGroups: { error, loading },
  } = useAppSelector((store) => store.communities);

  if (error) return <p>ERROR</p>;
  if (loading) return <SmallSpinner />
  return (
    <ul className="flex flex-col gap-1">
      {communityData?.slice(0, 5).map((item, index) => {
        return (
          <li
            key={index}
            className="text-gray-600 hover:text-azure-blue transition-colors ease-in duration-150"
          >
            <Link to={item.name}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CommunityItemList;
