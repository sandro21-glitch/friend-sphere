import { Link } from "react-router-dom";
import { UserSearchResult } from "../../../../slices/search/searchSlice";

export interface UserResultsType {
  users: UserSearchResult[];
}

const UserResults = ({ users }: UserResultsType) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <Link to={`user/${user.uid}`} className="block mb-2 border-b pb-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                  alt="user image"
                  className="w-10 h-10"
                />
                <div className="flex flex-col leading-4">
                  <span className="font-medium text-[14px]">{user.name}</span>
                  <span className="text-gray-500 text-[14px]">
                    {user.email}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserResults;
