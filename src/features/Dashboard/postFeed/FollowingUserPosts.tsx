const tempPostData = [
  {
    id: 1,
    name: "Username",
    group: "Travel",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "3 days ago",
  },
  {
    id: 2,
    name: "Username",
    group: "Travel",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "3 days ago",
  },
  {
    id: 3,
    name: "Username",
    group: "Travel",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "3 days ago",
  },
];

const FollowingUserPosts = () => {
  return (
    <ul className="flex flex-col gap-5">
      {tempPostData.map((user) => {
        return (
          <li
            key={user.id}
            className="bg-white p-5 border rounded-md hover:shadow-md transition-shadow ease-in duration-200"
          >
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
                  alt="user"
                  className="w-[3rem] h-[3rem]"
                />
                <div>
                  <h5>{user.name}</h5>
                  <p>{user.group}</p>
                </div>
              </div>
              <div>
                <p>{user.date}</p>
              </div>
            </div>
            <div>{user.comment}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default FollowingUserPosts;
