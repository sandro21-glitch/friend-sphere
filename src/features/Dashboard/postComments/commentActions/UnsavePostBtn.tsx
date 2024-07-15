import { BsBookmarkDashFill } from "react-icons/bs";
import ActionDropdown from "../../../../ui/ActionDropdown";

const UnsavePostBtn = () => {
  return (
    <button type="button" className="flex items-center gap-5 relative group">
      <BsBookmarkDashFill className="text-[1.7rem]" />
      <ActionDropdown
        dropdownText="Remove from saved"
        positions="-top-10 right-[-155%]"
      />
    </button>
  );
};

export default UnsavePostBtn;
