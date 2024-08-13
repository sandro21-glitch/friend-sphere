import SummaryDate from "./SummaryDate";
import TotalCommunities from "./TotalCommunities";
import UserFollowerStats from "./UserFollowerStats";

const ProfileSummary = () => {
  return (
    <div className="bg-white  border rounded-md p-5 flex flex-col gap-2">
      <SummaryDate />
      <TotalCommunities />
      <UserFollowerStats />
    </div>
  );
};

export default ProfileSummary;
