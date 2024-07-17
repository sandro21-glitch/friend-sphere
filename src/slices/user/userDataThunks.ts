import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { get, ref, update } from "firebase/database";
import { TopUserTypes } from "./userTypes";

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
  void,
  { rejectValue: string }
>("users/fetchTopUsers", async (_, { rejectWithValue }) => {
  try {
    const usersRef = ref(database, "users");
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      throw new Error("No users found");
    }

    const users: TopUserTypes[] = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const followersCount = data.followers?.length || 0;

      users.push({
        id: data.uid,
        followersCount,
        name: data.name,
      });

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
