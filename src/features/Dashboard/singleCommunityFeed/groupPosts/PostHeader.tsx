type PostHeaderTypes = {
  userName: string;
  groupName: string;
  timeAgo: string;
};
const PostHeader = ({ groupName, timeAgo, userName }: PostHeaderTypes) => {
  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center">
        <img
          src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
          alt="user img"
          className="w-14 h-14 rounded-full"
        />
        <div className="leading-5">
          <p className="font-semibold text-[18px]">{userName}</p>
          <p className="text-[14px]">{groupName}</p>
        </div>
      </div>
      <p className="text-[14px] text-gray-500">{timeAgo.replace("about", " ")}</p>
    </div>
  );
};

export default PostHeader;
