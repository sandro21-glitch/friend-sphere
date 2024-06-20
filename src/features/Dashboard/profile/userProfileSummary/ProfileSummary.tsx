const ProfileSummary = () => {
  return (
    <div className="bg-white  border rounded-md p-5 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="text-[20px]">Profile Summary</h3>
        <p className="text-[14px]">Joined 293 days ago (August 30, 2023)</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Total Posts</p>
        <p>3</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Total Communities</p>
        <p>9</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Posts in Communities</p>
        <p>3 in 3 communities</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Followers</p>
        <p>7</p>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <p className="text-gray-500">Following</p>
        <p>99</p>
      </div>
    </div>
  );
};

export default ProfileSummary;