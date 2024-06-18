import Input from "../../ui/Input";

type RegFormTypes = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  registerUser: {
    name: string;
    email: string;
    password: string;
  };
};

const RegFormInputs = ({ handleChange, registerUser }: RegFormTypes) => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={registerUser.name}
        />
      </div>
      <div className="mb-3">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          onChange={handleChange}
          value={registerUser.email}
        />
      </div>
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={registerUser.password}
        />
      </div>
    </div>
  );
};

export default RegFormInputs;
