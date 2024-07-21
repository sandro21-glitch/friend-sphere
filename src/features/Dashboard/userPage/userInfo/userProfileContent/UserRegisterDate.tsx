import { MdUpdate } from "react-icons/md";
import { format } from "date-fns";

type UserRegisterDateTypes = { registeredDate: string };

const UserRegisterDate = ({ registeredDate }: UserRegisterDateTypes) => {
  // Convert ISO date string to Date object
  const date = new Date(registeredDate);

  // Format date to "MMM d, yyyy"
  const formattedDate = format(date, "MMM d, yyyy");

  return (
    <li className="flex items-center gap-2 text-md">
      <MdUpdate />
      Joined on {formattedDate}
    </li>
  );
};

export default UserRegisterDate;
