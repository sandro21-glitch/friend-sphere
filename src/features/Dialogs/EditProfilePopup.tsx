import { useState } from "react";
import Bio from "./editProfilePopup/Bio";
import Interests from "./editProfilePopup/Interests";
import ListOfInterests from "./editProfilePopup/ListOfInterests";
import Location from "./editProfilePopup/Location";
import EditProfileActions from "./editProfilePopup/EditProfileActions";

const EditProfilePopup = () => {
  const [interestList, setInterestList] = useState<string[]>([]);
  return (
    <div className="w-full max-w-[36rem] mx-auto bg-white p-6 rounded shadow-lg">
      <h2 className="text-[18px] font-medium mb-5">Update Profile</h2>
      <Bio />
      <Location />
      <Interests
        interestList={interestList}
        setInterestList={setInterestList}
      />
      <ListOfInterests
        setInterestList={setInterestList}
        interestList={interestList}
      />
      <EditProfileActions />
    </div>
  );
};

export default EditProfilePopup;
