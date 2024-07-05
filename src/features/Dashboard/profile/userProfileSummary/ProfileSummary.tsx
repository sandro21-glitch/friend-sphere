import SummaryDate from "./SummaryDate";
import TotalCommunities from "./TotalCommunities";


const ProfileSummary = () => {
  return (
    <div className="bg-white  border rounded-md p-5 flex flex-col gap-2">
      <SummaryDate />
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Total Posts</p>
        <p>3</p>
      </div>
      <TotalCommunities />
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Posts in Communities</p>
        <p>3 in 3 communities</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Followers</p>
        <p>7</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Following</p>
        <p>99</p>
      </div>
    </div>
  );
};

export default ProfileSummary;
