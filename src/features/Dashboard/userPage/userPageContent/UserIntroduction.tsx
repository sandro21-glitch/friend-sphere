import { CiLocationOn } from "react-icons/ci";
import { parseBioText } from "../../../../utils/TextUtils";
import { FaCrown } from "react-icons/fa";
type UserIntroductionTypes = {
  name: string;
  location: string;
  bio: string;
  isAdmin: boolean;
};

const UserIntroduction = ({
  location,
  name,
  bio,
  isAdmin,
}: UserIntroductionTypes) => {
  return (
    <div className="flex items-center flex-col">
      <h3 className="text-lg font-semibold" title={isAdmin ? "Admin" : ""}>
        {isAdmin ? (
          <span className="flex items-center flex-row-reverse gap-1">
            <FaCrown className="text-[16px] mb-[3px] text-azure-blue" /> {name}
          </span>
        ) : (
          name
        )}
      </h3>
      <h6 className="flex items-center text-gray-500">
        <CiLocationOn />{" "}
        {location ? location : <span className="text-sm">N/A</span>}
      </h6>
      {bio ? (
        <p className="text-gray-700 mt-2 p-4 flex items-center gap-1 text-[14px] rounded-md bg-gray-100 shadow-sm italic">
          {parseBioText(bio)}
        </p>
      ) : (
        <p className="text-gray-500 mt-2 italic">No bio available</p>
      )}
    </div>
  );
};

export default UserIntroduction;
