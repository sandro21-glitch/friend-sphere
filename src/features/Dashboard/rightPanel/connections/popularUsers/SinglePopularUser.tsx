import { Link, useNavigate } from "react-router-dom";
import { TopUserTypes } from "../../../../../slices/user/userTypes";
import ConnectButton from "../../../../../ui/ConnectButton";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { followUser } from "../../../../../slices/user/userDataThunks";
import { useState } from "react";

type SinglePopularUserTypes = {
  user: TopUserTypes;
};

const SinglePopularUser = ({ user }: SinglePopularUserTypes) => {
  const { followersCount, name, id } = user;
  const { uid: currentUserId, name: currentUserName } =
    useAppSelector((store) => store.auth.userData) || {};
  const {
    error: { followingError },
  } = useAppSelector((store) => store.userData);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFollowUser = async () => {
    if (currentUserId && currentUserName) {
      setLoading(true);
      try {
        await dispatch(
          followUser({
            currentUserId,
            currentUserName,
            followUserId: id,
            followUserName: name,
          })
        ).unwrap();
      } catch (error) {
        console.log(followingError || "failed to follow user");
        alert(followingError || "failed to follow user");
      } finally {
        setLoading(false);
        navigate(`user/${id}`);
      }
    }
  };

  return (
    <li>
      <div
        className="flex justify-between items-center border border-slate-100 py-[.25rem] px-[.5rem]
     rounded-md shadow-sm shadow-[#f2f5fc]"
      >
        <Link to={`user/${id}`} className="flex items-center gap-2">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt=""
            className="w-[2rem] h-[2rem]"
          />
          <div>
            <div className="text-[16px] font-medium">{name}</div>
            <div className="text-[12px] capitalize text-gray-500">
              followers: {followersCount}
            </div>
          </div>
        </Link>
        <ConnectButton
          name="follow"
          follow
          onClick={handleFollowUser}
          loading={loading}
        />
      </div>
    </li>
  );
};

export default SinglePopularUser;
