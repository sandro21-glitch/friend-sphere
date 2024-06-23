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
      // Path to the user data in Firebase
      const userRef = ref(database, `users/${uid}`);
      // Data to update
      const updates = { bio, location, interests };

      // Update user data in Firebase
      await update(userRef, updates);

      // Log successful update
      console.log(`User ${uid} updated successfully`);

      // Return the updated user data
      return { uid, bio, location, interests };
    } catch (error: any) {
      // Log the error for debugging
      console.error(`Failed to update user ${uid}:`, error.message || error);

      // Handle errors and return a rejected action with the error message
      return rejectWithValue(error.message || "Failed to update user data");
    }
  }
);
