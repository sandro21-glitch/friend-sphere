import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const PostCommentsHeader = () => {
  return (
    <div className="mb-5">
      <button
        className="w-7 h-7 rounded-full border border-dashed
       border-azure-blue flex items-center justify-center mb-5"
      >
        <IoChevronBack className="text-azure-blue text-[.8rem]" />
      </button>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
            alt="user image"
            className="w-12 h-12 mr-2"
          />
          <div className="flex flex-col">
            <Link to="" className="text-[1rem] font-medium">
              DemoUser
            </Link>
            <Link to="" className="text-[.7rem] text-gray-500">
              Music
            </Link>
          </div>
        </div>
        <p className="text-[.8rem] text-gray-500">June 1st, 2024 9:08 PM</p>
      </div>
    </div>
  );
};

export default PostCommentsHeader;
