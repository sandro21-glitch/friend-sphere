type UserInterestsInfoTypes = {
  interests: string[];
  name: string;
};

const UserInterestsInfo = ({interests,name}:UserInterestsInfoTypes) => {
  return (
    <li className="text-md">
      <p className="font-semibold text-md">Interests:</p>
      {interests && interests.length > 0 ? (
        interests.map((interest, idx) => (
          <span key={idx}>
            {interest}
            {idx < interests.length - 1 && ", "}
          </span>
        ))
      ) : (
        <span className="text-gray-500">
          {name} has not added any interests.
        </span>
      )}
    </li>
  );
};

export default UserInterestsInfo;
