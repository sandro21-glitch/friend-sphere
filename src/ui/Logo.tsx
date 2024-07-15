import { Link } from "react-router-dom";
import logo from "../assets/images/logo-no-background.svg";

type LogoTypes = {
  height?: string;
};

const Logo = ({ height }: LogoTypes) => {
  return (
    <Link to="/home" className="flex justify-center cursor-pointer">
      <img src={logo} alt="logo" loading="lazy" style={{ height: height }} />
    </Link>
  );
};

export default Logo;
