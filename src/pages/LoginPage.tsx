import { useState } from "react";
import LoginBtn from "../features/loginPage/LoginBtn";
import LoginFormInputs from "../features/loginPage/LoginFormInputs";
import LoginFormLinks from "../features/loginPage/LoginFormLinks";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";
import { loginUser } from "../slices/user/userThunks";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

type LoginFormType = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [userLoginForm, setUserLoginForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(loginUser(userLoginForm));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/home");
    } else if (loginUser.rejected.match(resultAction)) {
      if (resultAction.payload) {
        console.error("Login error:", resultAction.payload);
      } else {
        console.error("Login error:", resultAction.error.message);
      }
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
