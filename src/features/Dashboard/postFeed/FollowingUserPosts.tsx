import { UserPostTypes } from "../../../slices/posts/postsSlice";

type FollowingUserPostTypes = {
  relevantPosts: UserPostTypes[] | null;
};

const FollowingUserPosts = ({ relevantPosts }: FollowingUserPostTypes) => {
  return (
    <ul className="flex flex-col gap-5">
      {relevantPosts?.map((post) => {
        const { userName, groupName, createdAt } = post;
        return (
          <li
            key={post.postId}
            className="bg-white p-5 border rounded-md hover:shadow-md transition-shadow ease-in duration-200"
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <img
                  src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                  alt="user"
                  className="w-[3rem] h-[3rem] mr-2"
                />
                <div>
                  <h5 className="font-bold text-[1.1rem]">{userName}</h5>
                  <p className="text-[.8rem] text-gray-500">{groupName}</p>
                </div>
              </div>
              <div>
                <p>{createdAt}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FollowingUserPosts;
