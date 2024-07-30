import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import SingleUserCommunityItem from "./SingleUserCommunityItem";
import { fetchJoinedGroupSummaries } from "../../../slices/community/communityThunks";
import PageDataLoader from "../../../ui/PageDataLoader";
import ErrorMessage from "../../../ui/ErrorMessage";

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

  if (loading) return <PageDataLoader />;
  if (error)
    return (
      <ErrorMessage message={error || "something went wrong... try again"} />
    );

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
