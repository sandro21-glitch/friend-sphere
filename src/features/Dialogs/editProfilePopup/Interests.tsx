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

    // Check if input value contains a comma
    if (inputValue.includes(",")) {
      const newInterests = inputValue.split(",").map((item) => item.trim());
      const filteredInterests = newInterests.filter((item) => item !== "");

      // Add items to interestList that are not already in it
      const uniqueInterests = Array.from(new Set([...interestList, ...filteredInterests]));

      setInterestList(uniqueInterests);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="interests" className="text-[14px] flex items-center gap-1">
        <LiaEditSolid />
        Interests (Type text and separate by comma to add)
      </label>
      <Input
        id="interests"
        name="interests"
        type="text"
        value={interestList.join(", ")}
        onChange={(e) => handleInputChange(e)}
        className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-full text-[14px]"
      />
    </div>
  );
};

export default Interests;
