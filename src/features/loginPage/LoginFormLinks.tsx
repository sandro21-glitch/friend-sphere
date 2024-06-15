import { Link } from "react-router-dom";

const LoginFormLinks = () => {
  return (
    <div className="flex items-center justify-center mb-5">
      <Link
        to=""
        className="block w-1/3 text-center pb-2 border-b-2 border-deep-blue"
      >
        Sign In
      </Link>
      <Link to="" className="block w-1/3 text-center pb-2 border-b">
        Sign Up
      </Link>
    </div>
  );
};

export default LoginFormLinks;
