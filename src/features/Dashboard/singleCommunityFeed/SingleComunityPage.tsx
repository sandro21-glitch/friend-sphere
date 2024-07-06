import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import GroupHeader from "./groupHeaderSection/GroupHeader";
import { useEffect, useState } from "react";
import GroupPostForm from "./groupHeaderSection/GroupPostForm";
import { fetchCommunityPosts } from "../../../slices/posts/postThunks";

const SingleComunityPage = () => {
  const [postPage, setPostPage] = useState("all");
  const location = useLocation();
  const { id } = location.state;
  const communityData = useAppSelector((store) =>
    store.communities.communityData?.find((data) => data.uid === id)
  );
  const dispatch = useAppDispatch();
  if (!communityData) return null;
  const { uid } = communityData;

  useEffect(() => {
    dispatch(fetchCommunityPosts({ communityId: communityData.uid }));
  }, [dispatch, postPage, uid]);

  return (
    <section className="col-span-2 min-h-full h-full mt-5 bg-white">
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
      <GroupPostForm groupId={uid} />
    </section>
  );
};

export default SingleComunityPage;
