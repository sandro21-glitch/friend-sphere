type InputTypes = {
  name: string;
  id: string;
  className?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

const Input = ({ id, name, type, className, onChange, value }: InputTypes) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full border p-3 rounded-lg outline-none ${className}`}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
