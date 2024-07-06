import { useAppSelector } from "../../../../hooks/reduxHooks";

const CreatePostBtn = () => {
  const {
    loading: { adding },
    error: { addingError },
  } = useAppSelector((store) => store.posts);

  return (
    <button
      type="submit"
      className="self-start bg-blue-500 hover:bg-deep-blue transition-colors ease-in duration-150
      text-white py-1 px-4 text-[14px] rounded-md"
      disabled={adding}
    >
      {adding ? "processing..." : "Create post"}
      {addingError && addingError}
    </button>
  );
};

export default CreatePostBtn;
