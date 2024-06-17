import PopularUsers from "./connections/PopularUsers";
import SuggestedCommunities from "./connections/SuggestedCommunities";

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
