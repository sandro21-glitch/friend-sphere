import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import GroupHeader from "./groupHeaderSection/GroupHeader";
import { useEffect, useState } from "react";
import GroupPostForm from "./groupHeaderSection/GroupPostForm";
import { fetchCommunityPosts } from "../../../slices/posts/postThunks";
import GroupPosts from "./groupPosts/GroupPosts";
import PageLoader from "../../../ui/PageLoader";

const SingleComunityPage = () => {
  const {
    loading: { fetching },
    error: { fetchingError },
  } = useAppSelector((store) => store.posts);
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

  if (fetching) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white flex items-center justify-center">
        <PageLoader />
      </section>
    );
  }
  if (fetchingError)
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {fetchingError || "Something went wrong"}
      </section>
    );
  return (
    <section className="col-span-2 min-h-full h-full mt-5 bg-white border">
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
      <GroupPostForm groupId={uid} />
      <GroupPosts communityId={communityData.uid} />
    </section>
  );
};

export default SingleComunityPage;
