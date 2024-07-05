import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";

const SingleComunityPage = () => {
  const location = useLocation();
  const { id } = location.state;
  const communityData = useAppSelector((store) =>
    store.communities.communityData?.find((data) => data.uid === id)
  );

  console.log(communityData);
  return (
    <section className="col-span-2 min-h-full h-full mt-5">
      SingleComunityPage data
    </section>
  );
};

export default SingleComunityPage;
