export interface CommunityTypes {
  name: string;
  uid: string;
  description: string;
  banner: string;
  rules: {
    rule: string;
    description: string;
    id: string;
  }[];
  members:
    | {
        memberid: string;
      }[]
    | null;
  posts: {
    userName: string;
    groupName: string;
    postId: string;
    userId: string;
    userPost: string;
    likedBy: string[] | null;
    postComments:
      | {
          userComment: string;
          userId: string;
          userName: string;
        }[]
      | null;
    createdAt: string;
  }[];
}

export interface CommunitySummary {
  uid: string;
  name: string;
}

export interface FullGroupListSummary {
  groupId: string;
  groupName: string;
  banner: string;
  membersCount: number;
}
export interface PostType {
  userName: string;
  groupName: string;
  postId: string;
  userId: string;
  userPost: string;
  likedBy: string[] | null;
  postComments:
    | {
        userComment: string;
        userId: string;
        userName: string;
      }[]
    | null;
  createdAt: string;
}
