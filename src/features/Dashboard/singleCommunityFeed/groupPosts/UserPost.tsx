type UserPostTypes = {
  userPost: string;
};

const UserPost = ({ userPost }: UserPostTypes) => {
  const parsePost = (post: string) => {
    // Regular expression to match `*text*` for bold text and `#hashtags`
    const regex = /(\*[^*]+\*)|(\s+)/g;

    const parts = post.split(regex).filter(Boolean).map((part, index) => {
      // Check if the part is a bold text enclosed in asterisks
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={index} className="font-bold">
            {part.slice(1, -1)} {/* Remove the asterisks for display */}
          </span>
        );
      }
      // Check if the part is a hashtag
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-azure-blue font-bold">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });

    return parts;
  };

  return <p className="mb-5">{parsePost(userPost)}</p>;
};

export default UserPost;
