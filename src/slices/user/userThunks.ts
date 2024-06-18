import { get, ref, set } from "firebase/database";
import { auth, database } from "../../config/firebase";
import { nanoid } from "nanoid";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserData, userFormData } from "./userTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

//register user
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
        uid: nanoid(),
        email,
        password,
        name,
        followers: [],
        following: [],
        registeredDate: new Date().toISOString(),
        joinedGroups: [],
        isAdmin: false,
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
  async (userData: UserData, { rejectWithValue }) => {
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
      // const {
      //   email,
      //   password,
      //   name,
      //   followers,
      //   following,
      //   registeredDate,
      //   joinedGroups,
      //   isAdmin,
      // } = userProfile;

      return { userProfile };
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);
