import logo from "../assets/images/logo-no-background.svg";

type LogoTypes = {
  height?: string;
};

const Logo = ({ height }: LogoTypes) => {
  return (
    <div className="flex justify-center ">
      <img src={logo} alt="logo" style={{ height: height }} />
    </div>
  );
};

export default Logo;
