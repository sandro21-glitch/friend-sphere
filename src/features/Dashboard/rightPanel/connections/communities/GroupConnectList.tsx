import { MdGroups } from "react-icons/md";
import { CommunityTypes } from "../../../../../slices/community/communitySlice";
import ConnectButton from "../../../../../ui/ConnectButton";

type GroupConnectListTypes = {
  nonJoinedGroupData: CommunityTypes[] | null;
};

const GroupConnectList = ({ nonJoinedGroupData }: GroupConnectListTypes) => {
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
                <p className="text-[.9rem]">{group.name}</p>
                <p className="flex gap-1 items-center text-[.8rem] text-gray-500">
                  <MdGroups />
                  {group.members ? group.members.length : 0}
                </p>
              </div>
            </div>
            <ConnectButton name="join" join />
          </li>
        );
      })}
    </ul>
  );
};

export default GroupConnectList;
