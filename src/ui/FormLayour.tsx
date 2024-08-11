type FormLayoutProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
const FormLayout = ({ children, onSubmit }: FormLayoutProps) => {
  return (
    <section className="bg-white min-h-screen flex justify-center items-center max-w-[90vw] mx-auto">
      <div className="flex items-center justify-center section-center w-full">
        <div className="w-full max-w-[28rem] ">
          <form className="w-full" onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
