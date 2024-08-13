import { Link } from "react-router-dom";
import { CommunitySearchResult } from "../../../../slices/search/searchSlice";

interface CommunityResultTypes {
  communities: CommunitySearchResult[];
}
const CommunityResults = ({ communities }: CommunityResultTypes) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">Communities</h3>
      <ul>
        {communities.map((community) => (
          <li key={community.uid}>
            <Link
              to={`community/${community.name}`}
              state={{ id: community.uid }}
              className="block mb-2 border-b pb-2 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={community.banner}
                  alt={community.name}
                  className="w-8 h-8 object-cover rounded-full mr-2"
                />
                <div>
                  <div className=" text-azure-blue text-[14px] font-bold">
                    {community.name}
                  </div>
                  <div className="text-gray-500 text-[13px]">
                    {community.description.length > 70
                      ? `${community.description.slice(0, 100)}...`
                      : community.description}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityResults;
