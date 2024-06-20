import Input from "../../../ui/Input";
import { FiUser } from "react-icons/fi";
const Bio = () => {
  return (
    <div className="mb-3">
      <label htmlFor="bio" className="flex items-center gap-1 text-[14px]">
        <FiUser />
        Bio
      </label>
      <Input
        id="bio"
        name="bio"
        type="text"
        className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-full text-[14px]"
      />
    </div>
  );
};

export default Bio;
