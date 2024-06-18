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
  registeredDate: string;
  joinedGroups: string[];
  isAdmin: boolean;
}

export interface userFormData {
  name: string;
  email: string;
  password: string;
}
