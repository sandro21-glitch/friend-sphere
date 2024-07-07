type UserPostTypes = {
  userPost: string;
};

const UserPost = ({ userPost }: UserPostTypes) => {
  return <p className="mb-5">{userPost}</p>;
};

export default UserPost;
