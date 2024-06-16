import RegFormInputs from "../features/registerPage/RegFormInputs";
import RegFormLinks from "../features/registerPage/RegFormLinks";
import SignUpBtn from "../features/registerPage/SignUpBtn";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";

const RegisterPage = () => {
  return (
    <FormLayout>
      <Logo height="4rem" />
      <RegFormLinks />
      <RegFormInputs />
      <SignUpBtn />
    </FormLayout>
  );
};

export default RegisterPage;
