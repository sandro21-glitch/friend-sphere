const PostCommentForm = () => {
  return (
    <form className="flex flex-col">
      <textarea
        id="comment"
        placeholder="Write a comment..."
        className="p-2 border rounded-md mb-5 resize-none h-[4rem]
         focus:border-azure-blue outline-none transition-all ease-in duration-150"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-azure-blue px-5 py-2 text-white rounded-md text-[.8rem] hover:bg-deep-blue transition-colors ease-in duration-150"
        >
          Comment
        </button>
      </div>
    </form>
  );
};

export default PostCommentForm;
