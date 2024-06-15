import LoginBtn from "../features/loginPage/LoginBtn";
import LoginFormInputs from "../features/loginPage/LoginFormInputs";
import LoginFormLinks from "../features/loginPage/LoginFormLinks";
import LoginFormLogo from "../features/loginPage/LoginFormLogo";

const LoginPage = () => {
  return (
    <section className="bg-white min-h-screen flex justify-center items-center">
      <div className="flex items-center justify-center section-center w-full">
        <div className="w-full max-w-[28rem] ">
          <form className="w-full">
            <LoginFormLogo />
            <LoginFormLinks />
            <LoginFormInputs />
            <LoginBtn />
          </form>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
