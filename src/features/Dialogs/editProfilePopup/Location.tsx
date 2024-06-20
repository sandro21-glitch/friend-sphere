import Input from "../../../ui/Input";
import { CiLocationOn } from "react-icons/ci";
const Location = () => {
  return (
    <div className="mb-3">
      <label htmlFor="location" className="text-[14px] flex items-center gap-1">
        <CiLocationOn />
        Location
      </label>
      <Input
        id="location"
        name="location"
        type="text"
        className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-full text-[14px]"
      />
    </div>
  );
};

export default Location;
