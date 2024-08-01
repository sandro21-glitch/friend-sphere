import { useState } from "react";
import RegFormInputs from "../features/registerPage/RegFormInputs";
import RegFormLinks from "../features/registerPage/RegFormLinks";
import SignUpBtn from "../features/registerPage/SignUpBtn";
import FormLayout from "../ui/FormLayour";
import Logo from "../ui/Logo";
import { useAppDispatch } from "../hooks/reduxHooks";
import { registerUser } from "../slices/user/authThunks";
import { useNavigate } from "react-router-dom";
import { fetchNonJoinedCommunities, fetchUserCommunities } from "../slices/community/communityThunks";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [registerUserForm, setRegisterUserForm] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(registerUser(registerUserForm));

      if (registerUser.fulfilled.match(resultAction)) {
        const { uid } = resultAction.payload;
        if (uid) {
          await dispatch(fetchNonJoinedCommunities(uid));
          navigate("/home");
        } else {
          console.error("No UID returned after registration");
        }
      } else {
        const errorMessage = resultAction.payload
          ? resultAction.payload
          : resultAction.error.message;
        console.error("Registration error:", errorMessage);
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
