import { useState } from "react";
import RegFormInputs from "../features/registerPage/RegFormInputs";
import RegFormLinks from "../features/registerPage/RegFormLinks";
import SignUpBtn from "../features/registerPage/SignUpBtn";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";
import { useAppDispatch } from "../hooks/reduxHooks";
import { registerUser } from "../slices/user/authSlice";
interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [registerUserForm, setRegisterUserForm] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(registerUser(registerUserForm));
      console.log("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Logo height="4rem" />
      <RegFormLinks />
      <RegFormInputs
        handleChange={handleChange}
        registerUser={registerUserForm}
      />
      <SignUpBtn />
    </FormLayout>
  );
};

export default RegisterPage;
