type SavedPostTextTypes = {
  userPost: string;
};
const SavedPostText = ({ userPost }: SavedPostTextTypes) => {
  return <p className="mb-5">{userPost}</p>;
};

export default SavedPostText;
