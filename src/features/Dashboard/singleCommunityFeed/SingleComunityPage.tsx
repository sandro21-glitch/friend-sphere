import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import GroupHeader from './groupHeaderSection/GroupHeader';
import GroupPostForm from './groupHeaderSection/GroupPostForm';
import { fetchCommunityPosts } from '../../../slices/posts/postThunks';
import GroupPosts from './groupPosts/GroupPosts';
import PageLoader from '../../../ui/PageLoader';
import DashboardPage from '../../../ui/DashboardPage';

const SingleCommunityPage: React.FC = () => {
  const {
    loading: { fetching },
    error: { fetchingError },
  } = useAppSelector((store) => store.posts);

  const [postPage, setPostPage] = useState<string>('all');

  const location = useLocation();
  const { id } = location.state || {};
  
  const communityData = useAppSelector((store) =>
    store.communities.communityData?.find((data) => data.uid === id)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (communityData) {
      dispatch(fetchCommunityPosts({ communityId: communityData.uid }));
    }
  }, [dispatch, postPage, communityData]);

  if (!id) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {"Community ID not found in location state."}
      </section>
    );
  }

  if (fetching) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white flex items-center justify-center">
        <PageLoader />
      </section>
    );
  }

  if (fetchingError) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {fetchingError || "Something went wrong"}
      </section>
    );
  }

  if (!communityData) {
    return (
      <section className="col-span-2 min-h-full h-full mt-5 bg-white">
        {"Community data not found."}
      </section>
    );
  }

  return (
    <DashboardPage>
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
      <GroupPostForm groupId={communityData.uid} />
      <GroupPosts communityId={communityData.uid} />
    </DashboardPage>
  );
};

export default SingleCommunityPage;
