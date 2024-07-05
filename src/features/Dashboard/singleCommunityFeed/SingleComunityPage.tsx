import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import GroupHeader from "./groupHeaderSection/GroupHeader";
import { useState } from "react";

const SingleComunityPage = () => {
  const [postPage, setPostPage] = useState("all");
  const location = useLocation();
  const { id } = location.state;
  const communityData = useAppSelector((store) =>
    store.communities.communityData?.find((data) => data.uid === id)
  );

  console.log(communityData);
  return (
    <section className="col-span-2 min-h-full h-full mt-5">
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
    </section>
  );
};

export default SingleComunityPage;
