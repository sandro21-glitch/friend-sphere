import DashboardPage from "./DashboardPage";
import PageLoader from "./PageLoader";

const PageDataLoader = () => {
  return (
    <DashboardPage>
      <div className="flex items-center justify-center h-full">
        <PageLoader />
      </div>
    </DashboardPage>
  );
};

export default PageDataLoader;
