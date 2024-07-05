type GroupHeaderTypes = {
  postPage: string;
  setPostPage: (page: string) => void;
};

const GroupHeader = ({ postPage, setPostPage }: GroupHeaderTypes) => {
  return (
    <ul className="flex items-center">
      <li
        onClick={() => setPostPage("all")}
        className={`p-2 rounded-md w-full text-center cursor-pointer ${
          postPage === "all"
            ? "bg-azure-blue text-white"
            : "border-b-2 border-transparent hover:border-gray-400 text-gray-500"
        }`}
      >
        All posts
      </li>
      <li
        onClick={() => setPostPage("following")}
        className={`p-2 rounded-md w-full text-center cursor-pointer ${
          postPage === "following"
            ? "bg-azure-blue text-white"
            : "border-b-2 border-transparent hover:border-gray-400 text-gray-500"
        }`}
      >
        You're following
      </li>
    </ul>
  );
};

export default GroupHeader;
