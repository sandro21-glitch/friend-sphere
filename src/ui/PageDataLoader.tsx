import PageLoader from "./PageLoader";

const PageDataLoader = () => {
  return (
    <article className="col-span-2 min-h-[85vh] w-full mt-5 bg-white">
      <div className="flex items-center justify-center h-full">
        <PageLoader />
      </div>
    </article>
  );
};

export default PageDataLoader;
