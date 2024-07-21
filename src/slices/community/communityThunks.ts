import { createAsyncThunk } from "@reduxjs/toolkit";

import { get, onValue, ref, update } from "firebase/database";
import { database } from "../../config/firebase";
import { CommunityTypes } from "./communitySlice";
import { UserData } from "../user/userTypes";

export const fetchCommunities = createAsyncThunk(
  "community/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<any>((resolve, _) => {
        onValue(
          communitiesRef,
          (snapshot) => {
            const communities: CommunityTypes[] = [];
            snapshot.forEach((childSnapshot) => {
              communities.push(childSnapshot.val() as CommunityTypes);
            });
            resolve(communities);
          },
          {
            onlyOnce: true,
          }
        );
      });

      return snapshot;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching communities");
    }
  }
);

export const fetchUserCommunities = createAsyncThunk(
  "community/fetchUserCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      const snapshot = await new Promise<any>((resolve, _) => {
        onValue(
          communitiesRef,
          (snapshot) => {
            const communities: CommunityTypes[] = [];
            snapshot.forEach((childSnapshot) => {
              const community = childSnapshot.val() as CommunityTypes;
              if (
                community.members &&
                community.members.some((member) => member.memberid === userId)
              ) {
                communities.push(community);
              }
            });
            resolve(communities);
          },
          {
            onlyOnce: true,
          }
        );
      });

      return snapshot;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error fetching user communities"
      );
    }
  }
);

//fetchNonJoinedCommunities
export const fetchNonJoinedCommunities = createAsyncThunk(
  "community/fetchNonJoinedCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");
      const snapshot = await get(communitiesRef);
      const allCommunities: CommunityTypes[] = [];

      snapshot.forEach((childSnapshot) => {
        allCommunities.push(childSnapshot.val() as CommunityTypes);
      });

      // Filter communities that user has not joined
      const nonJoinedCommunities = allCommunities.filter(
        (community) =>
          !community.members ||
          !community.members.some((member) => member.memberid === userId)
      );

      // randomly select three communities
      const randomCommunities = nonJoinedCommunities
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      return randomCommunities;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching communities");
    }
  }
);

//join group
export const joinGroup = createAsyncThunk(
  "community/joinGroup",
  async (
    {
      communityUid,
      communityName,
      uid,
    }: { communityUid: string; communityName: string; uid: string },
    { rejectWithValue }
  ) => {
    try {
      const communitiesRef = ref(database, "communities");
      const usersRef = ref(database, `users/${uid}`);

      // Fetch all communities
      const snapshot = await get(communitiesRef);
      const communities = snapshot.val() || {};

      let communityToUpdate: any = null;
      Object.keys(communities).forEach((key) => {
        if (communities[key].uid === communityUid) {
          communityToUpdate = { id: key, ...communities[key] };
        }
      });

      if (!communityToUpdate) {
        return rejectWithValue(`Community with uid ${communityUid} not found.`);
      }

      const updatedMembers = [
        ...(communityToUpdate.members || []),
        { memberid: uid },
      ];

      const updates: any = {};
      updates[`${communityToUpdate.id}/members`] = updatedMembers;

      await update(communitiesRef, updates);
      communityToUpdate.members = updatedMembers;

      // Fetch user data
      const userSnapshot = await get(usersRef);
      const userData: UserData = userSnapshot.val() || {};

      const updatedJoinedGroups = [
        ...(userData.joinedGroups || []),
        {
          groupId: communityUid,
          groupName: communityName,
        },
      ];

      const userUpdates: any = {};
      userUpdates[`joinedGroups`] = updatedJoinedGroups;

      // Update user's joined groups
      await update(usersRef, userUpdates);

      return { communityToUpdate, communityUid };
    } catch (error: any) {
      console.error("Error joining group:", error);
      return rejectWithValue(error.message || "Error joining group");
    }
  }
);

//leave community
export const leaveGroup = createAsyncThunk(
  "community/leaveGroup",
  async (
    { communityUid, uid }: { communityUid: string; uid: string },
    { rejectWithValue }
  ) => {
    try {
      // Create references to the communities and users nodes
      const communitiesRef = ref(database, "communities");
      const userRef = ref(database, `users/${uid}`); // Use `users/${uid}` for specific user

      // Fetch all communities
      const communitiesSnapshot = await get(communitiesRef);
      const communities = communitiesSnapshot.val() || {};

      let communityToUpdate: any = null;
      let memberIndex: number | undefined = undefined;

      Object.keys(communities).forEach((key) => {
        if (communities[key].uid === communityUid) {
          communityToUpdate = { id: key, ...communities[key] };

          // Find index of the user in members array
          if (communityToUpdate.members) {
            memberIndex = communityToUpdate.members.findIndex(
              (member: { memberid: string }) => member.memberid === uid
            );
          }
        }
      });

      if (
        !communityToUpdate ||
        memberIndex === undefined ||
        memberIndex === -1
      ) {
        return rejectWithValue(
          `User with uid ${uid} is not a member of community with uid ${communityUid}.`
        );
      }

      // Remove user from members array
      communityToUpdate.members.splice(memberIndex, 1);

      const communityUpdates: any = {};
      communityUpdates[`${communityToUpdate.id}/members`] = communityToUpdate.members;

      // Fetch the user data
      const userSnapshot = await get(userRef);
      const user = userSnapshot.val() || {};

      if (!user.joinedGroups) {
        return rejectWithValue("User joinedGroups not found.");
      }

      // Remove community from user's joinedGroups array
      const updatedJoinedGroups = user.joinedGroups.filter(
        (group: { groupId: string }) => group.groupId !== communityUid
      );

      const userUpdates: any = {};
      userUpdates['joinedGroups'] = updatedJoinedGroups;

      // Update both community and user data
      await Promise.all([
        update(ref(database, `communities/${communityToUpdate.id}`), communityUpdates),
        update(userRef, userUpdates),
      ]);

      return { communityToUpdate, communityUid };
    } catch (error: any) {
      console.error("Error leaving group:", error);
      return rejectWithValue(error.message || "Error leaving group");
    }
  }
);