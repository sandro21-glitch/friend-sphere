import { useAppSelector } from "../../../../hooks/reduxHooks";

const TotalCommunities = () => {
  const communityCount = useAppSelector(
    (store) => store.communities.communityData?.length || 0
  );

  return (
    <div className="flex justify-between items-center text-[14px]">
      <p className="text-gray-500">Total Communities</p>
      <p>{communityCount}</p>
    </div>
  );
};

export default TotalCommunities;
