import UserProfileCard from "./userProfileCard/UserProfileCard";
import ProfileSummary from "./userProfileSummary/ProfileSummary";

const UserProfile = () => {
  return (
    <section className="col-span-2 min-h-full h-full mt-5 relative">
      <UserProfileCard />
      <ProfileSummary />
    </section>
  );
};

export default UserProfile;
