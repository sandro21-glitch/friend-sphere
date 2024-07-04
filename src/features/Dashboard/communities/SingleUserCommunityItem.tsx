import { Link } from "react-router-dom";

type SingleCommunityTypes = {
  banner: string;
  name: string;
  membersLength: number;
  id: string;
};

const SingleUserCommunityItem = ({
  banner,
  membersLength,
  name,
  id,
}: SingleCommunityTypes) => {
  return (
    <li className="w-full bg-white border rounded-md p-5 mb-5">
      <Link to={`/community/${name}`} state={{ id }} className="cursor-auto">
        <img
          src={banner}
          alt={name}
          className="h-full w-full mb-4 cursor-pointer"
          loading="lazy"
        />
        <div>
          <h3 className="font-semibold text-[1.5rem] cursor-pointer">{name}</h3>
          <p className="text-gray-500">{membersLength} members</p>
        </div>
      </Link>
    </li>
  );
};

export default SingleUserCommunityItem;
