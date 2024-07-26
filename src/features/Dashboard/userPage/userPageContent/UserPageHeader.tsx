import UserImageWithFollow from "./UserImageWithFollow";
import UserIntroduction from "./UserIntroduction";

type UserPageHeaderTypes = {
  name: string;
  location: string;
  bio: string;
};

const UserPageHeader = ({ name, location, bio }: UserPageHeaderTypes) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <UserImageWithFollow name={name} />
      <UserIntroduction location={location} name={name} bio={bio} />
    </div>
  );
};

export default UserPageHeader;
