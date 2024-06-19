import EditProfileBtn from "./EditProfileBtn";
import ProfileHeader from "./ProfileHeader";
import UserInterests from "./UserInterests";
import UserLocation from "./UserLocation";

const UserProfileCard = () => {
  return (
    <div className="w-full">
      <EditProfileBtn />
      <ProfileHeader />
      <UserLocation />
      <UserInterests />
    </div>
  );
};

export default UserProfileCard;
