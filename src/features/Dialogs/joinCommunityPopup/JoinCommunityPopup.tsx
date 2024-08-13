import { useAppSelector } from "../../../hooks/reduxHooks";
import JoinCommunityPopupActions from "./JoinCommunityPopupActions";
import JoinCommunityPopupHeader from "./JoinCommunityPopupHeader";

const JoinCommunityPopup = () => {
  const joinCommunity = useAppSelector((store) => store.modals.joinCommunity);

  if (!joinCommunity.communityData) {
    return null;
  }

  const { communityId, communityName, membersCount } =
    joinCommunity.communityData;

  return (
    <div className="w-[95vw] max-w-[28rem] h-auto bg-white p-5 flex justify-center flex-col items-center rounded-md">
      <JoinCommunityPopupHeader
        communityName={communityName}
        membersCount={membersCount}
      />
      <p className="text-center mb-5">
        Are you sure you want to join this community? You can always leave
        later.
      </p>
      <JoinCommunityPopupActions communityId={communityId} communityName={communityName} />
    </div>
  );
};

export default JoinCommunityPopup;
