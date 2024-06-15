import LoginBtn from "../features/loginPage/LoginBtn";
import LoginFormInputs from "../features/loginPage/LoginFormInputs";
import LoginFormLinks from "../features/loginPage/LoginFormLinks";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";

const LoginPage = () => {
  return (
    <FormLayout>
      <Logo />
      <LoginFormLinks />
      <LoginFormInputs />
      <LoginBtn />
    </FormLayout>
  );
};

export default LoginPage;
