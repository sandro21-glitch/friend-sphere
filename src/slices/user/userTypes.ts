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
  joinedGroups: string[];
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
