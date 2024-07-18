import React from "react";
import DashboardPage from "./DashboardPage";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <DashboardPage>
      <h3 className="p-5 border-b text-center text-[1.2rem] font-semibold normal-case">
        {message}
      </h3>
    </DashboardPage>
  );
};

export default ErrorMessage;
