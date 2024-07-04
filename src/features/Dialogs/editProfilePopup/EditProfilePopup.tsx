import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateUserProfile } from "../../../slices/user/userDataThunks";
import { setUpdateProfileModal } from "../../../slices/modals/modalSlice";
import Bio from "./Bio";
import Interests from "./Interests";
import ListOfInterests from "./ListOfInterests";
import EditProfileActions from "./EditProfileActions";
import Location from "./Location";

const EditProfilePopup = () => {
  const { userData } = useAppSelector((store) => store.auth);
  if (!userData) return null;

  const [interestList, setInterestList] = useState<string[]>(
    userData.interests || []
  );
  const [bio, setBio] = useState<string>(userData.bio || "");
  const [location, setLocation] = useState<string>(userData.location || "");

  const dispatch = useAppDispatch();

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUserProfile({
          uid: userData.uid,
          bio,
          location,
          interests: interestList,
        })
      );
      dispatch(setUpdateProfileModal(false));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="w-full max-w-[36rem] mx-auto bg-white p-6 rounded shadow-lg"
    >
      <h2 className="text-[18px] font-medium mb-5">Update Profile</h2>
      <Bio bio={bio} setBio={setBio} />
      <Location location={location} setLocation={setLocation} />
      <Interests
        interestList={interestList}
        setInterestList={setInterestList}
      />
      <ListOfInterests
        setInterestList={setInterestList}
        interestList={interestList}
      />
      <EditProfileActions />
    </form>
  );
};

export default EditProfilePopup;
