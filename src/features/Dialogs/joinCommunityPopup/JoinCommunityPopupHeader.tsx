import { RiGroup2Fill } from "react-icons/ri";

type PopupHeaderTypes = {
  communityName: string;
  membersCount: number | null;
};
const JoinCommunityPopupHeader = ({
  communityName,
  membersCount,
}: PopupHeaderTypes) => {
  return (
    <h3 className="text-[1.4rem] flex text-azure-blue mb-5 font-semibold">
      <RiGroup2Fill className="text-inherit mr-2" />
      <div className="relative text-inherit">
        {communityName}
        <p
          className="absolute -top-4 -right-4 z-[99999] text-[10px] flex items-center justify-center
       text-white bg-azure-blue w-[1.5rem] h-[1.5rem] rounded-full"
        >
          {membersCount}
        </p>
      </div>
    </h3>
  );
};

export default JoinCommunityPopupHeader;
