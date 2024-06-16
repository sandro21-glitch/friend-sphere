import LoginBtn from "../features/loginPage/LoginBtn";
import LoginFormInputs from "../features/loginPage/LoginFormInputs";
import LoginFormLinks from "../features/loginPage/LoginFormLinks";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";

const LoginPage = () => {
  return (
    <FormLayout>
      <Logo height="4rem" />
      <LoginFormLinks />
      <LoginFormInputs />
      <LoginBtn />
    </FormLayout>
  );
};

export default LoginPage;
