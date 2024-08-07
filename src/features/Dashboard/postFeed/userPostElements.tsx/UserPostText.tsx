type UserPostTextTypes = {
  userPost: string;
};

const UserPostText = ({ userPost }: UserPostTextTypes) => {
  // Function to parse the post text and apply styling
  const parsePost = (post: string) => {
    // Regex to match hashtags and bold text
    const regex = /(\*[^*]+\*)|(#\w+)/g;
    let lastIndex = 0;

    // Array to hold JSX elements
    const elements = [];

    // Find all matches
    post.replace(regex, (match, p1, p2, offset) => {
      // Push text before the match
      if (offset > lastIndex) {
        elements.push(post.slice(lastIndex, offset));
      }
      
      // Push styled match
      if (p1) {
        elements.push(
          <span key={offset} className="font-bold">
            {p1.slice(1, -1)} {/* Remove the surrounding asterisks */}
          </span>
        );
      } else if (p2) {
        elements.push(
          <span key={offset} className="text-azure-blue font-bold">
            {p2}
          </span>
        );
      }
      
      // Update last index
      lastIndex = offset + match.length;
      
      return match; // Necessary for replace function, but not used here
    });

    // Push remaining text
    if (lastIndex < post.length) {
      elements.push(post.slice(lastIndex));
    }

    return elements;
  };

  return <p className="mb-5">{parsePost(userPost)}</p>;
};

export default UserPostText;
