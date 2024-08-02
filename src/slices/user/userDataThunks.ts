import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, ref, update } from "firebase/database";
import { TopUserTypes, UserData, UserType } from "./userTypes";

// Async thunk to update user's bio, location, and interests in Firebase
export const updateUserProfile = createAsyncThunk(
  "userData/updateUserProfile",
  async (
    {
      uid,
      bio,
      location,
      interests,
    }: { uid: string; bio: string; location: string; interests: string[] },
    { rejectWithValue }
  ) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const updates = { bio, location, interests };

      await update(userRef, updates);

      return { uid, bio, location, interests };
    } catch (error: any) {
      console.error(`Failed to update user ${uid}:`, error.message || error);

      return rejectWithValue(error.message || "Failed to update user data");
    }
  }
);

//fetch popular users

export const fetchTopUsers = createAsyncThunk<
  TopUserTypes[],
  string, // currentUserId as an argument
  { rejectValue: string }
>("users/fetchTopUsers", async (currentUserId, { rejectWithValue }) => {
  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      throw new Error("No users found");
    }

    const followingRef = ref(database, `users/${currentUserId}/following`);
    const followingSnapshot = await get(followingRef);
    const followingList: Set<string> = new Set();

    if (followingSnapshot.exists()) {
      followingSnapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        followingList.add(data.userUid);
      });
    }

    const users: TopUserTypes[] = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const followersCount = data.followers?.length || 0;

      if (data.uid !== currentUserId && !followingList.has(data.uid)) {
        users.push({
          id: data.uid,
          followersCount,
          name: data.name,
        });
      }

      if (users.length >= 5) {
        return true; // Stop iterating after collecting 5 users
      }
    });

    return users;
  } catch (error: any) {
    console.error("Failed to fetch top users:", error.message || error);
    return rejectWithValue(error.message || "Failed to fetch top users");
  }
});

// Async thunk to fetch user information based on user ID
export const fetchUserById = createAsyncThunk<
  UserType,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (uid, { rejectWithValue }) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User not found");
    }

    const data: UserData = snapshot.val();
    const user: UserType = {
      uid: data.uid,
      email: data.email,
      name: data.name,
      followers: data.followers,
      following: data.following,
      savedPosts: data.savedPosts,
      registeredDate: data.registeredDate,
      joinedGroups: data.joinedGroups,
      isAdmin: data.isAdmin,
      location: data.location,
      interests: data.interests,
      bio: data.bio,
    };

    return user;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch user data");
  }
});

interface FollowUserTypes {
  currentUserId: string;
  followUserId: string;
  followUserName: string;
  currentUserName: string;
}
// follow user
export const followUser = createAsyncThunk<string, FollowUserTypes>(
  "users/followUser",
  async (
    { currentUserId, followUserId, followUserName, currentUserName },
    { rejectWithValue }
  ) => {
    try {
      const updates: any = {};

      // Add the followed user to the current user's following list
      updates[`/users/${currentUserId}/following/${followUserId}`] = {
        userUid: followUserId,
        name: followUserName,
      };

      // Add the current user to the followed user's followers list
      updates[`/users/${followUserId}/followers/${currentUserId}`] = {
        userUid: currentUserId,
        name: currentUserName,
      };
      
      await update(ref(database), updates);

      // Return the followUserId upon success
      return followUserId;
    } catch (error) {
      return rejectWithValue("Failed to follow user");
    }
  }
);

interface UnfollowUserTypes {
  currentUserId: string;
  unfollowUserId: string;
}

//unfollow user
export const unfollowUser = createAsyncThunk<string, UnfollowUserTypes>(
  "users/unfollowUser",
  async (
    { currentUserId, unfollowUserId },
    { rejectWithValue }
  ) => {
    try {
      const updates: any = {};

      // Remove the unfollowed user from the current user's following list
      updates[`/users/${currentUserId}/following/${unfollowUserId}`] = null;

      // Remove the current user from the unfollowed user's followers list
      updates[`/users/${unfollowUserId}/followers/${currentUserId}`] = null;

      await update(ref(database), updates);

      // Return the unfollowUserId upon success
      return unfollowUserId;
    } catch (error) {
      return rejectWithValue("Failed to unfollow user");
    }
  }
);