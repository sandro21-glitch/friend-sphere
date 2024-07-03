import { MdGroups } from "react-icons/md";
import { CommunityTypes } from "../../../../../slices/community/communitySlice";
import ConnectButton from "../../../../../ui/ConnectButton";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { joinGroup } from "../../../../../slices/community/communityThunks";

type NonJoinedCommunityTypes = {
  group: CommunityTypes;
};

const SingleNonJoinedCommunity = ({ group }: NonJoinedCommunityTypes) => {
  const uid = useAppSelector((store) => store.auth.userData?.uid);
  const dispatch = useAppDispatch();

  const handleJoinCommunity = async () => {
    if (!uid) return;

    try {
      await dispatch(joinGroup({ uid, communityUid: group.uid }));
    } catch (error) {
      console.error("Error joining community:", error);
    }
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
      <ConnectButton name="join" join onClick={handleJoinCommunity} />
    </li>
  );
};

export default SingleNonJoinedCommunity;
