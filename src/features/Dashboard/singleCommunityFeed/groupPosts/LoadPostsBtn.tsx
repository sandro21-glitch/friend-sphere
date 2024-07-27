type LoadPostsBtnTypes = {
  loadPosts: () => void;
  fetching: boolean;
};

const LoadPostsBtn = ({ loadPosts, fetching }: LoadPostsBtnTypes) => {
  return (
    <button
      type="button"
      onClick={loadPosts}
      className="mt-5 py-1 w-full rounded-md border border-transparent
   text-white bg-azure-blue hover:border-azure-blue hover:bg-transparent hover:text-azure-blue
   transition-colors ease-in duration-150"
    >
      {fetching ? "Loading..." : "Load more posts"}
    </button>
  );
};

export default LoadPostsBtn;
