import Logo from "../../assets/images/logo-no-background.svg";

const LoginFormLogo = () => {
  return (
    <div className="mb-5 flex justify-center">
      <img src={Logo} alt="logo" className="h-[4rem]" />
    </div>
  );
};

export default LoginFormLogo;
