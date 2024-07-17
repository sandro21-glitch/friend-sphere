import { useAppSelector } from "../../../../hooks/reduxHooks";
import PopularUsersList from "./popularUsers/PopularUsersList";
const PopularUsers = () => {
  const {
    loading: { fetchingTopUsers },
    popularUsers,
  } = useAppSelector((store) => store.userData);

  if (fetchingTopUsers) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <h5 className="font-semibold text-[16px] mb-5">
        Popular Users to Follow
      </h5>
      <PopularUsersList popularUsers={popularUsers || []} />
    </div>
  );
};

export default PopularUsers;
