type UserPostHeaderTypes = {
  userName: string;
  groupName: string;
  createdAt: string;
};
const UserPostHeader = ({
  createdAt,
  groupName,
  userName,
}: UserPostHeaderTypes) => {
  return (
    <div className="flex justify-between mb-3">
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
  );
};

export default UserPostHeader;
