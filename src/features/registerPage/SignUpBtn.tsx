import { useAppSelector } from "../../hooks/reduxHooks";
import SmallSpinner from "../../ui/SmallSpinner";

const SignUpBtn = () => {
  const { loading } = useAppSelector((store) => store.auth);
  return (
    <button
      type="submit"
      className="bg-azure-blue hover:bg-deep-blue transition-all ease-in duration-200 w-full text-white py-2 rounded-lg mb-3"
    >
      {loading ? (
        <div className="text-[14px]">
          Registering...
          <SmallSpinner />
        </div>
      ) : (
        "Sign Up"
      )}
    </button>
  );
};

export default SignUpBtn;
