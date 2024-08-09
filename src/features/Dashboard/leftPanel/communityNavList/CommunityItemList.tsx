import { useAppSelector } from "../../../../hooks/reduxHooks";
import SmallSpinner from "../../../../ui/SmallSpinner";
import SingleCommunityListItem from "./SingleCommunityListItem";

const CommunityItemList = () => {
  const {
    userGroups,
    joinedGroups: { error, loading },
  } = useAppSelector((store) => store.communities);

  if (error) return <p>ERROR</p>;
  if (loading) return <SmallSpinner />;

  return (
    <ul className="flex flex-col gap-2">
      {userGroups?.slice(0, 5).map((item) => {
        return <SingleCommunityListItem key={item.uid} item={item} />;
      })}
    </ul>
  );
};

export default CommunityItemList;
