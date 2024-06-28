import { useAppSelector } from "../../../../hooks/reduxHooks";
import { MdGroups } from "react-icons/md";
import ConnectButton from "../../../../ui/ConnectButton";
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
    <ul className="flex flex-col gap-3">
      {nonJoinedGroupData?.map((group) => {
        return (
          <li className="flex justify-between items-start">
            <div className="flex gap-5">
              <img
                src={group.banner}
                alt={group.name}
                className="w-[2rem] h-[2rem] object-cover rounded-full bg-center"
              />
              <div>
                <h4 className="text-[.9rem]">{group.name}</h4>
                <div className="flex gap-1 items-center text-[.8rem] text-gray-500">
                  <MdGroups />
                  <span>
                    {group.members ? group.members.length : 0}
                  </span>
                </div>
              </div>
            </div>
            <ConnectButton name="join" join />
          </li>
        );
      })}
    </ul>
  );
};

export default SuggestedCommunities;
