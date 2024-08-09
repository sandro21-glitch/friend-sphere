import PopularUsers from "./PopularUsers";
import SuggestedCommunities from "./SuggestedCommunities";

const Connections = () => {
  return (
    <div
      className="p-5 hidden lg:block bg-white col-span-1 h-[85vh]
     sticky top-[5rem] border rounded-md"
    >
      <SuggestedCommunities />
      <hr />
      <PopularUsers />
    </div>
  );
};

export default Connections;
