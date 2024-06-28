import { useAppSelector } from "../../../../hooks/reduxHooks";

import NoCommunities from "./communities/NoCommunities";
import GroupConnectList from "./communities/GroupConnectList";
const SuggestedCommunities = () => {
  const { nonJoinedGroupData, nonJoinedGroups } = useAppSelector(
    (store) => store.communities
  );

  if (nonJoinedGroups.loading) return <p>Loading...</p>;
  if (nonJoinedGroups.error) return <p>error...</p>;

  if (nonJoinedGroupData && nonJoinedGroupData?.length < 1) {
    return <NoCommunities />;
  }
  return (
    <div>
      <h5 className="font-semibold mb-5 text-[.9rem] capitalize">
        Suggested Communities
      </h5>
      <GroupConnectList nonJoinedGroupData={nonJoinedGroupData} />
    </div>
  );
};

export default SuggestedCommunities;
