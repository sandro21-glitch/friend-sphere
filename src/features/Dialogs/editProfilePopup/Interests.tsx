import React from "react";
import Input from "../../../ui/Input";
import { LiaEditSolid } from "react-icons/lia";

type InterestTypes = {
  interestList: string[];
  setInterestList: React.Dispatch<React.SetStateAction<string[]>>;
};

const Interests = ({ interestList, setInterestList }: InterestTypes) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (interestList.length < 5 && inputValue.endsWith(',')) {
      const newInterests = [...interestList, ""];
      setInterestList(newInterests);
    } else {
      const newInterests = inputValue.split(",").map((item) => item.trim());
      setInterestList(newInterests.filter((item) => item !== ""));
    }
  };

  return (
    <div className="mb-3">
      <label
        htmlFor="interests"
        className="text-[14px] flex items-center gap-1"
      >
        <LiaEditSolid />
        Interests (Separated by comma)
      </label>
      <Input
        id="interests"
        name="interests"
        type="text"
        value={interestList.join(", ")}
        onChange={handleInputChange}
        className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-full text-[14px]"
      />
    </div>
  );
};

export default Interests;
