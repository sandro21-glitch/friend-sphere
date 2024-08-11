import { useAppSelector } from "../../../../hooks/reduxHooks";

const UserInterests = () => {
  const { userData } = useAppSelector((store) => store.auth);

  return (
    <div>
      <p className="text-[16px] font-semibold mb-1">Interests</p>
      {userData?.interests ? (
        <ul className="flex flex-wrap items-center gap-2">
          {userData?.interests.map((interest, index) => {
            return (
              <li
                key={index}
                className="text-[14px] bg-gray-100 rounded-full py-1 px-3
            hover:bg-gray-300 transition-colors ease-in duration-150"
              >
                {interest}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-[14px]">
          No interests have been set yet. Add some interests to let people know
          more about you.
        </p>
      )}
    </div>
  );
};

export default UserInterests;
