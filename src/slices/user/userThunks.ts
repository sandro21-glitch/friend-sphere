import { ref, set } from "firebase/database";
import { auth, database } from "../../config/firebase";
import { nanoid } from "nanoid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserData, userFormData } from "./userTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
        };
  
        await set(ref(database, `users/${uid}`), userProfile);
  
        return userProfile;
      } catch (error: any) {
        return rejectWithValue(error.message || "Registration failed");
      }
    }
  );