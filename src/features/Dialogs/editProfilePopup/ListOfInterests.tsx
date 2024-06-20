import { interests } from "../../../constants/interests";

type ListOfInterestTypes = {
  setInterestList: React.Dispatch<React.SetStateAction<string[]>>;
  interestList: string[];
};

const ListOfInterests = ({
  setInterestList,
  interestList,
}: ListOfInterestTypes) => {
  const handlePushInterest = (interest: string) => {
    if (interestList.length < 5 && !interestList.includes(interest)) {
      setInterestList((prev) => [...prev, interest]);
    }
  };

  return (
    <ul className="flex flex-wrap gap-3 mb-3">
      {interests.map((interest, index) => {
        return (
          <li
            key={index}
            onClick={() => handlePushInterest(interest)}
            className="text-[11px] bg-gray-200 hover:bg-gray-300
             cursor-pointer px-2 py-1 rounded-full transition-colors ease-in duration-150"
          >
            {interest}
          </li>
        );
      })}
    </ul>
  );
};

export default ListOfInterests;
