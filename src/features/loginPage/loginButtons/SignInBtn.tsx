import { useAppSelector } from "../../../hooks/reduxHooks";
import SmallSpinner from "../../../ui/SmallSpinner";

const SignInBtn = () => {
  const { loading } = useAppSelector((store) => store.auth);

  return (
    <button className="bg-azure-blue hover:bg-deep-blue transition-all ease-in duration-200 w-full text-white py-2 rounded-lg mb-3">
      {loading ? (
        <div className="text-[14px]">
          Signing in...
          <SmallSpinner />
        </div>
      ) : (
        "Sign in"
      )}
    </button>
  );
};

export default SignInBtn;
