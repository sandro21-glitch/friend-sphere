type InputTypes = {
  name: string;
  id: string;
  className?: string;
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
};

const Input = ({
  id,
  name,
  type,
  className,
  onChange,
  value,
  placeholder,
  defaultValue,
}: InputTypes) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full border p-3 outline-none ${className}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
