import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import GroupHeader from "./groupHeaderSection/GroupHeader";
import GroupPostForm from "./groupHeaderSection/GroupPostForm";
import GroupPosts from "./groupPosts/GroupPosts";
import PageLoader from "../../../ui/PageLoader";
import DashboardPage from "../../../ui/DashboardPage";
import { fetchCommunityById } from "../../../slices/community/communityThunks";

const SingleCommunityPage: React.FC = () => {
  const {
    singleGroup: { loading, error },
    groupById,
  } = useAppSelector((store) => store.communities);

  const [postPage, setPostPage] = useState<string>("all");

  const location = useLocation();
  const { id } = location.state || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCommunityById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white flex items-center justify-center">
        <PageLoader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {error || "Something went wrong"}
      </section>
    );
  }

  if (!groupById) return null;

  const { posts, uid, name } = groupById;

  return (
    <DashboardPage>
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
      <GroupPostForm groupId={uid} name={name} />
      <GroupPosts communityId={uid} posts={posts} />
    </DashboardPage>
  );
};

export default SingleCommunityPage;
