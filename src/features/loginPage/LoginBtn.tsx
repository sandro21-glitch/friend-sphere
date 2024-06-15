import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <div>
      <button className="bg-azure-blue hover:bg-deep-blue transition-all ease-in duration-200 w-full text-white py-2 rounded-lg mb-3">
        Sign in
      </button>
      <div className="flex items-center">
        <span className="border w-1/2"></span>
        <Link to='' className="block w-full text-center text-azure-blue text-[14px] cursor-pointer hover:underline">
          Sign in as demo user
        </Link>
        <span className="border w-1/2"></span>
      </div>
    </div>
  );
};

export default LoginBtn;
