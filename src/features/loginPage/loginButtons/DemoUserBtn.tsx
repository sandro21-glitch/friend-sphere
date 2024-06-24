import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { loginDemoUser } from "../../../slices/user/authThunks";

const DemoUserBtn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginDemo = async () => {
    try {
      const resultAction = await dispatch(loginDemoUser()).unwrap();
      if (resultAction) {
        navigate("/home");
      }
    } catch (err) {
      console.log("Failed to log in as demo user. Please try again.", err);
    }
  };

  return (
    <div className="flex items-center">
      <span className="border w-1/2"></span>
      <button
        type="button"
        onClick={handleLoginDemo}
        className="w-full text-center text-azure-blue text-[14px] cursor-pointer hover:underline"
      >
        Sign in as demo user
      </button>
      <span className="border w-1/2"></span>
    </div>
  );
};

export default DemoUserBtn;
