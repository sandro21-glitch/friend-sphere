import { Link } from "react-router-dom";

type SingleCommunityTypes = {
  banner: string;
  name: string;
  membersLength: number;
};

const SingleUserCommunityItem = ({
  banner,
  membersLength,
  name,
}: SingleCommunityTypes) => {
  return (
    <li className="w-full bg-white border rounded-md p-5 mb-5">
      <Link to='/'>
        <img
          src={banner}
          alt={name}
          className="h-full w-full mb-4"
          loading="lazy"
        />
        <div>
          <h3 className="font-semibold text-[1.5rem]">{name}</h3>
          <p>{membersLength} members</p>
        </div>
      </Link>
    </li>
  );
};

export default SingleUserCommunityItem;
