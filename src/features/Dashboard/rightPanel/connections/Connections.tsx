import PopularUsers from "./PopularUsers";
import SuggestedCommunities from "./SuggestedCommunities";

const Connections = () => {
  return (
    <div className="p-5">
      <SuggestedCommunities />
      <hr />
      <PopularUsers />
    </div>
  );
};

export default Connections;
