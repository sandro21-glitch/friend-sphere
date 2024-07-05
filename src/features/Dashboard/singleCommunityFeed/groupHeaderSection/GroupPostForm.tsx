import { useState } from "react";

const GroupPostForm = () => {
  const [postText, setPostText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postText.trim()) {
      setPostText("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 border-b">
      <label htmlFor="post" className="flex flex-col mb-2">
        <span className="mb-2 font-semibold">
          Share something with your community:
        </span>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          id="post"
          placeholder="Type your post here..."
          className="p-2 border rounded-md mb-2 fixed-textarea"
        />
      </label>
      {postText.length > 0 && postText !== "" && (
        <button
          type="submit"
          className="self-start bg-blue-500 hover:bg-deep-blue transition-colors ease-in duration-150
      text-white py-1 px-4 text-[14px] rounded-md"
        >
          Create post
        </button>
      )}
    </form>
  );
};

export default GroupPostForm;
