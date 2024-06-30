import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../config/firebase";
import { ref, update } from "firebase/database";

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
