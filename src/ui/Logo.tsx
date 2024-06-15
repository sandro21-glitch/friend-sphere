import logo from "../assets/images/logo-no-background.svg";

const Logo = () => {
  return (
    <div className="mb-5 flex justify-center">
      <img src={logo} alt="logo" className="h-[4rem]" />
    </div>
  );
};

export default Logo;
