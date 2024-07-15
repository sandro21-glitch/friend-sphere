import { GoTriangleDown } from "react-icons/go";

type ActionDropdownTypes = {
  dropdownText: string;
};

const ActionDropdown = ({ dropdownText }: ActionDropdownTypes) => {
  return (
    <span
      className="absolute -top-10 -right-[18px] group-hover:block hidden w-fit text-nowrap
      text-[11px] bg-azure-blue px-1 py-2 rounded-md
       text-white opacity-0 group-hover:opacity-100 transition-all ease-in duration-200
      "
    >
      {dropdownText}
      <GoTriangleDown
        className="absolute -bottom-[13px] left-0
     right-0 w-full z-[99999] text-azure-blue text-[22px]"
      />
    </span>
  );
};

export default ActionDropdown;
