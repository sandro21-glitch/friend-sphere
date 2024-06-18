import Input from "../../ui/Input";

type LoginFormTypes = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userLoginForm: {
    email: string;
    password: string;
  };
};

const LoginFormInputs = ({ handleChange, userLoginForm }: LoginFormTypes) => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={userLoginForm.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={userLoginForm.password}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LoginFormInputs;
