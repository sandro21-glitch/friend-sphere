import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import SmallSpinner from "../../../ui/SmallSpinner";
import SingleUserCommunityItem from "./SingleUserCommunityItem";
import { fetchJoinedGroupSummaries } from "../../../slices/community/communityThunks";

const UserCommunitiesList = () => {
  const {
    fullGroups: { error, loading },
    fullGroupList,
  } = useAppSelector((store) => store.communities);

  const userId = useAppSelector((store) => store.auth.userData?.uid);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchJoinedGroupSummaries(userId));
    }
  }, [dispatch, userId]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full">
        <SmallSpinner />
      </div>
    );
  if (error) return <p>error...</p>;

  return (
    <ul className="flex flex-col gap-3">
      {fullGroupList?.map((groupData) => {
        const { banner, groupId, groupName, membersCount } = groupData;
        return (
          <SingleUserCommunityItem
            key={groupId}
            banner={banner}
            name={groupName}
            id={groupId}
            membersLength={membersCount ? membersCount : 0}
          />
        );
      })}
    </ul>
  );
};

export default UserCommunitiesList;
