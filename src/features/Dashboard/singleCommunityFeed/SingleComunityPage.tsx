import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import GroupHeader from "./groupHeaderSection/GroupHeader";
import GroupPostForm from "./groupHeaderSection/GroupPostForm";
import GroupPosts from "./groupPosts/GroupPosts";
import PageLoader from "../../../ui/PageLoader";
import DashboardPage from "../../../ui/DashboardPage";
import { fetchCommunityById } from "../../../slices/community/communityThunks";
import { fetchCommunityPosts } from "../../../slices/posts/postThunks";
import {
  clearGroupPosts,
  setCurrentGroup,
} from "../../../slices/posts/postsSlice";
import FollowingUsersGroupPosts from "./followingUserGroupPosts/FollowingUsersGroupPosts";

const SingleCommunityPage: React.FC = () => {
  const {
    singleGroup: { loading, error },
    groupById,
  } = useAppSelector((store) => store.communities);
  const { fetching: fetchingGroupPosts } = useAppSelector(
    (store) => store.posts.loading
  );

  const [postPage, setPostPage] = useState<string>("all");
  const [offset, setOffset] = useState<string | undefined>(undefined); // Track last post ID
  const [initialLoad, setInitialLoad] = useState<boolean>(true); // Track initial load

  const location = useLocation();
  const { id } = location.state || {};

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(clearGroupPosts());
      dispatch(fetchCommunityById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (groupById?.uid) {
      dispatch(setCurrentGroup(groupById.uid));
      dispatch(fetchCommunityPosts({ communityId: groupById.uid }))
        .unwrap()
        .then((result) => {
          const { posts } = result;
          if (posts.length > 0) {
            setOffset(posts[posts.length - 1].postId); // Set offset to the last post ID
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        })
        .finally(() => {
          // Once posts are fetched, no longer in the initial load state
          setInitialLoad(false);
        });
    }
  }, [dispatch, groupById?.uid]);

  if (loading || (fetchingGroupPosts && initialLoad)) {
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

  const { uid, name } = groupById;

  return (
    <DashboardPage>
      <GroupHeader postPage={postPage} setPostPage={setPostPage} />
      {postPage === "all" ? (
        <>
          <GroupPostForm groupId={uid} name={name} />
          <GroupPosts communityId={uid} offset={offset} setOffset={setOffset} />
        </>
      ) : (
        <FollowingUsersGroupPosts />
      )}
    </DashboardPage>
  );
};

export default SingleCommunityPage;
