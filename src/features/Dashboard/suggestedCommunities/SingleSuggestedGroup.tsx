import { useAppDispatch } from "../../../hooks/reduxHooks";
import { CommunityTypes } from "../../../slices/community/communityTypes";
import { setJoinCommunityModal } from "../../../slices/modals/modalSlice";
import ConnectButton from "../../../ui/ConnectButton";

type SingleSuggestedGroupTypes = {
  group: CommunityTypes;
};

const SingleSuggestedGroup = ({ group }: SingleSuggestedGroupTypes) => {
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
    <li
      key={group.uid}
      className="flex items-center justify-between border p-4 rounded-md"
    >
      <div className="flex items-center gap-2">
        <img
          src={group.banner}
          alt="group image"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h5 className="text-[16px] font-semibold">{group.name}</h5>
          <p>{group.members?.length || 0} members</p>
        </div>
      </div>
      <ConnectButton name="Join" join onClick={handleJoinCommunity} />
    </li>
  );
};

export default SingleSuggestedGroup;
