import LeaveGroupActions from "./LeaveGroupActions";

const LeaveGroupPopup = () => {
  return (
    <div className="w-full max-w-[24rem] p-5 bg-white rounded-md ">
      <h4 className="text-[1.2rem] text-center mb-3 font-semibold">
        Leave Community
      </h4>
      <p className="text-center mb-3 text-[14px] text-gray-500">
        Are you sure you want to leave this community?
      </p>
      <LeaveGroupActions />
    </div>
  );
};

export default LeaveGroupPopup;
