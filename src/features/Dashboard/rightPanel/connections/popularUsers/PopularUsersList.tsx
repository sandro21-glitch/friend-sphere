import { TopUserTypes } from "../../../../../slices/user/userTypes";
import SinglePopularUser from "./SinglePopularUser";

type PopularUserTypes = {
  popularUsers: TopUserTypes[];
};

const PopularUsersList = ({ popularUsers }: PopularUserTypes) => {
  return (
    <ul className="flex flex-col gap-5">
      {popularUsers?.map((user) => {
        return <SinglePopularUser key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default PopularUsersList;
