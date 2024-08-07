import { MdGroups } from "react-icons/md";
import ConnectButton from "../../../../../ui/ConnectButton";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { setJoinCommunityModal } from "../../../../../slices/modals/modalSlice";
import { CommunityTypes } from "../../../../../slices/community/communityTypes";

type NonJoinedCommunityTypes = {
  group: CommunityTypes;
};

const SingleNonJoinedCommunity = ({ group }: NonJoinedCommunityTypes) => {

  const dispatch = useAppDispatch();
  
  const handleJoinCommunity = () => {
    dispatch(
      setJoinCommunityModal({
        isModalOpen: true,
        communityData: {
          communityId: group.uid,
          communityName: group.name,
          membersCount: group.members?.length || 0,
        },
      })
    );
  };

  return (
    <li key={group.uid} className="flex justify-between items-start">
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
      <ConnectButton name="Join" join onClick={handleJoinCommunity} />
    </li>
  );
};

export default SingleNonJoinedCommunity;
