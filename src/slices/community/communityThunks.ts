import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref, update } from "firebase/database";
import { database } from "../../config/firebase";
import { UserData } from "../user/userTypes";
import {
  CommunitySummary,
  CommunityTypes,
  FullGroupListSummary,
} from "./communityTypes";

export const fetchUserCommunities = createAsyncThunk(
  "community/fetchUserCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      const userRef = ref(database, `users/${userId}`);

      // Fetch user data
      const userSnapshot = await get(userRef);
      const userData: UserData = userSnapshot.val();

      if (!userData || !userData.joinedGroups) {
        return [];
      }

      // Map the joinedGroups to only include community ID and name
      const userCommunities: CommunitySummary[] = userData.joinedGroups.map(
        (group) => ({
          uid: group.groupId,
          name: group.groupName,
        })
      );

      return userCommunities;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error fetching user communities"
      );
    }
  }
);

//fetch single group by id
export const fetchCommunityById = createAsyncThunk<
  CommunityTypes,
  string,
  { rejectValue: string }
>(
  "community/fetchCommunityById",
  async (communityUid: string, { rejectWithValue }) => {
    try {
      const communitiesRef = ref(database, "communities");

      // Fetch all communities
      const snapshot = await get(communitiesRef);
      const communities = snapshot.val() || {};

      // Find the community by UID
      let communityToFetch: CommunityTypes | null = null;
      Object.keys(communities).forEach((key) => {
        if (communities[key].uid === communityUid) {
          communityToFetch = { ...communities[key], id: key } as CommunityTypes;
        }
      });

      if (!communityToFetch) {
        return rejectWithValue(`Community with uid ${communityUid} not found.`);
      }

      return communityToFetch;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error fetching community");
    }
  }
);
export const fetchNonJoinedCommunities = createAsyncThunk<
  CommunityTypes[],
  string,
  { rejectValue: string }
>(
  "community/fetchNonJoinedCommunities",
  async (userId: string, { rejectWithValue }) => {
    try {
      // Reference to the communities in Firebase
      const communitiesRef = ref(database, "communities");
      const snapshot = await get(communitiesRef);

      if (!snapshot.exists()) {
        throw new Error("No communities found");
      }

      const allCommunities: CommunityTypes[] = [];
      snapshot.forEach((childSnapshot) => {
        allCommunities.push(childSnapshot.val() as CommunityTypes);
      });

      // Fetch user data to determine joined communities
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.val();

      // If joinedGroups is missing, consider all communities
      let nonJoinedCommunities: CommunityTypes[];

      if (!userData || !userData.joinedGroups) {
        nonJoinedCommunities = allCommunities;
      } else {
        // Map the joinedGroups to a Set of community IDs
        const joinedGroupIds: Set<string> = new Set(
          userData.joinedGroups.map((group: { groupId: string }) => group.groupId)
        );

        // Filter out communities that the user has not joined
        nonJoinedCommunities = allCommunities.filter(
          (community) => !joinedGroupIds.has(community.uid)
        );
      }

      // Randomly select three communities
      const randomCommunities = nonJoinedCommunities
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      return randomCommunities;
    } catch (error: any) {
      console.error("Error fetching non-joined communities:", error);
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
      communityUpdates[`${communityToUpdate.id}/members`] =
        communityToUpdate.members;

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
      userUpdates["joinedGroups"] = updatedJoinedGroups;

      // Update both community and user data
      await Promise.all([
        update(
          ref(database, `communities/${communityToUpdate.id}`),
          communityUpdates
        ),
        update(userRef, userUpdates),
      ]);

      return { communityToUpdate, communityUid };
    } catch (error: any) {
      console.error("Error leaving group:", error);
      return rejectWithValue(error.message || "Error leaving group");
    }
  }
);

// thunk for fetching joined group summaries
export const fetchJoinedGroupSummaries = createAsyncThunk<
  FullGroupListSummary[],
  string,
  { rejectValue: string }
>(
  "groups/fetchJoinedGroupSummaries",
  async (userId: string, { rejectWithValue }) => {
    try {
      // Reference to the user's joinedGroups in Firebase
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        throw new Error("User not found");
      }

      const userData = userSnapshot.val();
      const joinedGroups = userData.joinedGroups || [];

      if (joinedGroups.length === 0) {
        return []; // Return empty array if no joined groups
      }

      // Reference to the communities in Firebase
      const communitiesRef = ref(database, "communities");
      const communitiesSnapshot = await get(communitiesRef);
      const communitiesMap: Record<string, CommunityTypes> = {};

      // Build a map of communityId to community data
      communitiesSnapshot.forEach((childSnapshot) => {
        const community = childSnapshot.val() as CommunityTypes;
        communitiesMap[community.uid] = community;
      });

      // Map joined groups to summaries
      const joinedGroupSummaries: FullGroupListSummary[] = joinedGroups.map(
        (group: { groupId: string }) => {
          const community = communitiesMap[group.groupId];

          return {
            groupId: group.groupId,
            groupName: community?.name || "",
            banner: community?.banner || "",
            membersCount: community?.members?.length || 0,
          };
        }
      );

      return joinedGroupSummaries;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Error fetching joined group summaries"
      );
    }
  }
);
