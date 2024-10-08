import { ReactNode } from "react";

type DashboardPageTypes = {
  children: ReactNode;
};

const DashboardPage = ({ children }: DashboardPageTypes) => {
  return (
    <section className="col-span-2 h-fit lg:min-h-[85vh] w-full mt-5 bg-white rounded-lg border">
      {children}
    </section>
  );
};

export default DashboardPage;
