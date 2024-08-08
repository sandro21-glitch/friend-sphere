import { useAppSelector } from "../../../../hooks/reduxHooks";

const TotalCommunities = () => {
  const totalUserCommunities = useAppSelector((store) => {
    const joinedGroups = store.auth.userData?.joinedGroups;
    return joinedGroups ? joinedGroups.length : 0;
  });
  return (
    <div className="flex justify-between items-center text-[14px]">
      <p className="text-gray-500">Total Communities</p>
      <p>{totalUserCommunities}</p>
    </div>
  );
};

export default TotalCommunities;
