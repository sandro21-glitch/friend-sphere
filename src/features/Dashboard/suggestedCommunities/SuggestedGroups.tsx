import { useAppSelector } from "../../../hooks/reduxHooks";
import DashboardPage from "../../../ui/DashboardPage";
import PageDataLoader from "../../../ui/PageDataLoader";
import SingleSuggestedGroup from "./SingleSuggestedGroup";

const SuggestedGroups = () => {
  const { nonJoinedGroupData, nonJoinedGroups } = useAppSelector(
    (store) => store.communities
  );

  if (nonJoinedGroups.loading) return <PageDataLoader />;
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
    <DashboardPage>
      <ul className="p-5 flex flex-col gap-5">
        {nonJoinedGroupData?.map((group) => {
          return <SingleSuggestedGroup key={group.uid} group={group} />;
        })}
      </ul>
    </DashboardPage>
  );
};

export default SuggestedGroups;
