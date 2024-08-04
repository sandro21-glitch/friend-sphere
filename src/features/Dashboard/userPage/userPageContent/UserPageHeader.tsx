import UserImageWithFollow from "./UserImageWithFollow";
import UserIntroduction from "./UserIntroduction";

type UserPageHeaderTypes = {
  name: string;
  location: string;
  bio: string;
  uid: string;
  isAdmin: boolean;
};

const UserPageHeader = ({
  name,
  location,
  bio,
  uid,
  isAdmin,
}: UserPageHeaderTypes) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <UserImageWithFollow name={name} uid={uid} />
      <UserIntroduction
        location={location}
        name={name}
        bio={bio}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default UserPageHeader;
