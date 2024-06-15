import Input from "../../ui/Input";

const RegFormInputs = () => {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <Input id="name" name="name" type="text" placeholder="Username" />
      </div>
      <div className="mb-3">
        <Input id="email" name="email" type="email" placeholder="Email address" />
      </div>
      <div>
        <Input id="password" name="password" type="password" placeholder="Password" />
      </div>
    </div>
  );
};

export default RegFormInputs;
