type PostTextTypes = {
  userPost: string;
};

const PostCommentText = ({ userPost }: PostTextTypes) => {
  const parsePost = (post: string) => {
    // Split the post text into parts based on the asterisks
    const parts = post.split(/(\*[^*]+\*)/).map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        // Remove the asterisks and render the text in bold
        const boldText = part.slice(1, -1); // Remove surrounding asterisks
        return (
          <span key={index} className="font-bold">
            {boldText}
          </span>
        );
      }
      return part;
    });
    return parts;
  };

  return <p className="mb-5">{parsePost(userPost)}</p>;
};

export default PostCommentText;
