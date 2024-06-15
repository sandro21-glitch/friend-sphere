type FormLayoutProps = {
  children: React.ReactNode;
};
const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <section className="bg-white min-h-screen flex justify-center items-center">
      <div className="flex items-center justify-center section-center w-full">
        <div className="w-full max-w-[28rem] ">
          <form className="w-full">{children}</form>
        </div>
      </div>
    </section>
  );
};

export default FormLayout;
