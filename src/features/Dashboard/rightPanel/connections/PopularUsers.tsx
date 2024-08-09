import { useAppSelector } from "../../../../hooks/reduxHooks";
import SmallSpinner from "../../../../ui/SmallSpinner";
import PopularUsersList from "./popularUsers/PopularUsersList";
const PopularUsers = () => {
  const {
    loading: { fetchingTopUsers },
    popularUsers,
  } = useAppSelector((store) => store.userData);

  if (fetchingTopUsers) {
    return (
      <div className="flex items-center justify-center w-full">
        <SmallSpinner />
      </div>
    );
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
