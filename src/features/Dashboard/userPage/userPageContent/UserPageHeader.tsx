import UserImageWithFollow from "./UserImageWithFollow";
import UserIntroduction from "./UserIntroduction";

type UserPageHeaderTypes = {
  name: string;
  location: string;
};

const UserPageHeader = ({ name, location }: UserPageHeaderTypes) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <UserImageWithFollow name={name} />
      <UserIntroduction location={location} name={name} />
    </div>
  );
};

export default UserPageHeader;
