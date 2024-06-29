import { IoIosLogOut } from "react-icons/io";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { signOutUser } from "../../../slices/user/authThunks";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(signOutUser());
      if (signOutUser.fulfilled.match(resultAction)) {
        dispatch({ type: "RESET_STATE" });
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 transition-colors ease-in duration-200 mb-2 text-[14px]
  flex items-center gap-1"
    >
      Logout
      <IoIosLogOut />
    </button>
  );
};

export default LogoutBtn;
