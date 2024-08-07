type SinglePostCommentTextsTypes = {
  userComment: string;
};

const SinglePostCommentTexts = ({
  userComment,
}: SinglePostCommentTextsTypes) => {
  // Function to parse and style mentions
  const parseComment = (comment: string) => {
    // Split comment into parts, highlighting mentions
    const parts = comment.split(/(@\w+)/).map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span key={index} className="text-blue-600 font-bold">
            {part}
          </span>
        );
      }
      return part;
    });

    return parts;
  };

  return <p className="text-[.9rem]">{parseComment(userComment)}</p>;
};

export default SinglePostCommentTexts;
