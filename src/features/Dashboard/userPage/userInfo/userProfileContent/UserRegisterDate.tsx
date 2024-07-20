import { MdUpdate } from "react-icons/md";

type UserRegisterDateTypes = { registeredDate: string };

const UserRegisterDate = ({ registeredDate }: UserRegisterDateTypes) => {
  return (
    <li className="flex items-center gap-2 text-md">
      <MdUpdate />
      {registeredDate}
    </li>
  );
};

export default UserRegisterDate;
