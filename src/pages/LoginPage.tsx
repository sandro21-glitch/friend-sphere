import { useState } from "react";
import LoginBtn from "../features/loginPage/LoginBtn";
import LoginFormInputs from "../features/loginPage/LoginFormInputs";
import LoginFormLinks from "../features/loginPage/LoginFormLinks";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";
import { loginUser } from "../slices/user/userThunks";
import { useAppDispatch } from "../hooks/reduxHooks";

type LoginFormType = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [userLoginForm, setUserLoginForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(loginUser(userLoginForm));
      console.log("login successful!");
    } catch (error) {
      console.error("login error:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormLayout onSubmit={handleLoginUser}>
      <Logo height="4rem" />
      <LoginFormLinks />
      <LoginFormInputs
        handleChange={handleChange}
        userLoginForm={userLoginForm}
      />
      <LoginBtn />
    </FormLayout>
  );
};

export default LoginPage;
