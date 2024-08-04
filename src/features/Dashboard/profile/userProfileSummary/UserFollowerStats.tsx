import { useAppSelector } from "../../../../hooks/reduxHooks";

const UserFollowerStats = () => {
  const { followers = {}, following = {} } =
    useAppSelector((store) => store.auth.userData) || {};

  const followersLength = Object.values(followers).length || 0;
  const followingLength = Object.values(following).length || 0;

  return (
    <>
      {" "}
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Followers</p>
        <p>{followersLength}</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Following</p>
        <p>{followingLength}</p>
      </div>
    </>
  );
};

export default UserFollowerStats;
