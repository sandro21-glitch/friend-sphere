export interface UserData {
  uid: string;
  email: string;
  password: string;
  name: string;
  followers: {
    userUid: string;
    name: string;
  }[];
  following: {
    userUid: string;
    name: string;
  }[];
  savedPosts: {
    postId: string;
    communityId: string;
  }[];
  registeredDate: string;
  joinedGroups: {
    groupId: string;
    groupName: string;
  }[];
  isAdmin: boolean;
  location: string;
  interests: string[];
  bio: string;
}

export interface userFormData {
  name: string;
  email: string;
  password: string;
}

//top user types
export interface TopUserTypes {
  id: string;
  name: string;
  followersCount: number;
}
// Define the user type excluding the password
export interface UserType {
  uid: string;
  email: string;
  name: string;
  followers: {
    userUid: string;
    name: string;
  }[];
  following: {
    userUid: string;
    name: string;
  }[];
  savedPosts: {
    postId: string;
    communityId: string;
  }[];
  registeredDate: string;
  joinedGroups: {
    groupId: string;
    groupName: string;
  }[];
  isAdmin: boolean;
  location: string;
  interests: string[];
  bio: string;
}

export interface FollowingUser {
  name: string;
  location: string;
  registeredDate: string;
  uid: string;
}
