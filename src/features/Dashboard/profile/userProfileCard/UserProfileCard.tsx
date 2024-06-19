import EditProfileBtn from "./EditProfileBtn";
import ProfileHeader from "./ProfileHeader";
import UserInterests from "./UserInterests";
import UserLocation from "./UserLocation";

const UserProfileCard = () => {
  return (
    <div className="w-full bg-white  border rounded-md p-5 mb-5">
      <EditProfileBtn />
      <ProfileHeader />
      <UserLocation />
      <UserInterests />
      <hr />
    </div>
  );
};

export default UserProfileCard;
