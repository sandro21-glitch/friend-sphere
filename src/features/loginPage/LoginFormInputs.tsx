import Input from "../../ui/Input";

const LoginFormInputs = () => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <Input id="email" name="email" type="email" />
      </div>
      <div>
        <Input id="password" name="password" type="password" />
      </div>
    </div>
  );
};

export default LoginFormInputs;
