import { get, ref, set } from "firebase/database";
import { auth, database } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserData, userFormData } from "./userTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunk to register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: userFormData, { rejectWithValue }) => {
    const { email, password, name } = userData;

    if (!email) {
      return rejectWithValue("Email is required");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;

      const userProfile: UserData = {
        uid, // UID from Firebase Authentication
        email,
        password,
        name,
        followers: [],
        following: [],
        registeredDate: new Date().toISOString(),
        joinedGroups: [],
        isAdmin: false,
        location: "",
        interests: [],
        bio: "",
      };

      await set(ref(database, `users/${uid}`), userProfile);

      return userProfile;
    } catch (error: any) {
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

// Login user thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const { uid, email } = userCredential.user;
      if (!email) {
        throw new Error("Email cannot be null");
      }

      // Fetch the user's profile data
      const userRef = ref(database, `users/${uid}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        throw new Error("User profile does not exist");
      }

      const userProfile = userSnapshot.val();

      return { userProfile };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

//login as demo user
export const loginDemoUser = createAsyncThunk(
  "auth/loginDemoUser",
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        import.meta.env.VITE_DEMOUSER_EMAIL,
        import.meta.env.VITE_DEMOUSER_PASSWORD
      );
      const { uid, email } = userCredential.user;
      if (!email) {
        throw new Error("Email cannot be null");
      }

      // Fetch the user's profile data
      const userRef = ref(database, `users/${uid}`);
      const userSnapshot = await get(userRef);

      if (!userSnapshot.exists()) {
        throw new Error("User profile does not exist");
      }

      const userProfile = userSnapshot.val();

      return { userProfile };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Sign out user thunk
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error: any) {
      return rejectWithValue(error.message || "Sign out failed");
    }
  }
);