type SavedPostTextTypes = {
  userPost: string;
};

const SavedPostText = ({ userPost }: SavedPostTextTypes) => {
  const parsePost = (post: string) => {
    const parts = post.split(/(\s+)/).map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <span key={index} className="text-azure-blue font-bold">
            {part}
          </span>
        );
      }
      return part;
    });
    return parts;
  };

  return <p className="mb-5">{parsePost(userPost)}</p>;
};

export default SavedPostText;
