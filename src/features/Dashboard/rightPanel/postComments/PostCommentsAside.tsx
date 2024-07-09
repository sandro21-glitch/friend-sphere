const PostCommentsAside = () => {
  return (
    <div className="p-5">
      <h4 className="border-b-2 text-[1rem] pb-2 text-center font-medium mb-5">
        Recent Comments
      </h4>
      <ul>
        <li className="border-b pb-2 mb-2">
          <div className="flex items-start mb-2">
            <img
              src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
              alt="user avatar"
              className="w-8 h-8 mr-2"
            />
            <div className="leading-5">
              <p className="text-[.9rem] font-medium">Demo User</p>
              <p className="text-[.8rem] text-gray-500">3 days ago</p>
            </div>
          </div>
          <p className="text-[.9rem]">Hiii</p>
        </li>
      </ul>
    </div>
  );
};

export default PostCommentsAside;
