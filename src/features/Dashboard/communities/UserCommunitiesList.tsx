import { useAppSelector } from "../../../hooks/reduxHooks";
import SmallSpinner from "../../../ui/SmallSpinner";
import SingleUserCommunityItem from "./SingleUserCommunityItem";

const UserCommunitiesList = () => {
  const {
    communityData,
    joinedGroups: { error, loading },
  } = useAppSelector((store) => store.communities);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full">
        <SmallSpinner />
      </div>
    );
  if (error) return <p>error...</p>;

  return (
    <ul className="flex flex-col gap-3">
      {communityData?.map((groupData) => {
        const { banner, name, members } = groupData;
        return (
          <SingleUserCommunityItem
            key={groupData.uid}
            banner={banner}
            name={name}
            membersLength={members?.length ? members?.length : 0}
          />
        );
      })}
    </ul>
  );
};

export default UserCommunitiesList;
