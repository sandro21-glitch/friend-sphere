import { CommunityTypes } from "../../../../../slices/community/communitySlice";
import SingleNonJoinedCommunity from "./SingleNonJoinedCommunity";

type GroupConnectListTypes = {
  nonJoinedGroupData: CommunityTypes[] | null;
};

const GroupConnectList = ({ nonJoinedGroupData }: GroupConnectListTypes) => {
  return (
    <ul className="flex flex-col gap-3">
      {nonJoinedGroupData?.map((group) => {
        return <SingleNonJoinedCommunity key={group.uid} group={group} />;
      })}
    </ul>
  );
};

export default GroupConnectList;
