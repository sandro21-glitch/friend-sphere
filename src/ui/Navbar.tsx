import Input from "./Input";
import Logo from "./Logo";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <header className="p-[.5rem] border-b bg-white">
      <nav className=" section-center section-x flex items-center justify-between gap-10">
        <Logo height="2.5rem" />
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Search for people, posts or communities"
          className="max-w-[660px] py-2 rounded-full text-[14px]"
        />
        <FaUserCircle className="min-w-7 min-h-7 cursor-pointer text-gray-400" />
      </nav>
    </header>
  );
};

export default Navbar;
