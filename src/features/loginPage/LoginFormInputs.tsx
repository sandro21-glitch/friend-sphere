import Input from "../../ui/Input";

const LoginFormInputs = () => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
        />
      </div>
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
    </div>
  );
};

export default LoginFormInputs;
