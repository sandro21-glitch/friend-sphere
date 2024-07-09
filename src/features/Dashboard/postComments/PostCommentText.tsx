type PostTextTypes = {
  userPost: string;
};

const PostCommentText = ({ userPost }: PostTextTypes) => {
  return <p className="mb-5">{userPost}</p>;
};

export default PostCommentText;
