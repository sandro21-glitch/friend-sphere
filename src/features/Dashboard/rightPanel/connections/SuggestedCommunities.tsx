import { useAppSelector } from "../../../../hooks/reduxHooks";

const SuggestedCommunities = () => {
  const { nonJoinedGroupData, nonJoinedGroups } = useAppSelector(
    (store) => store.communities
  );

  if (nonJoinedGroups.loading) return <p>Loading...</p>;
  if (nonJoinedGroups.error) return <p>error...</p>;

  if (nonJoinedGroupData && nonJoinedGroupData?.length < 1) {
    return (
      <div className="leading-10">
        <h5 className="font-semibold text-[16px]">Suggested Communities</h5>
        <p className="text-gray-500 text-[14px]">
          No communities to join. Check back later
        </p>
      </div>
    );
  }
  return (
    <ul>
      {nonJoinedGroupData?.map((group) => {
        return <li>{group.name}</li>;
      })}
    </ul>
  );
};

export default SuggestedCommunities;
