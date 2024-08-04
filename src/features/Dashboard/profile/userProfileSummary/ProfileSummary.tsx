import { useAppSelector } from "../../../../hooks/reduxHooks";
import SummaryDate from "./SummaryDate";
import TotalCommunities from "./TotalCommunities";

const ProfileSummary = () => {


  const { followers = {}, following = {} } =
    useAppSelector((store) => store.auth.userData) || {};

  const followersLength = Object.values(followers).length || 0;
  const followingLength = Object.values(following).length || 0;

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
        <p>{followersLength}</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Following</p>
        <p>{followingLength}</p>
      </div>
    </div>
  );
};

export default ProfileSummary;
