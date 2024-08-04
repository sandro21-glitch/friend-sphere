import { 
  FaGithub, FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, 
  FaPinterest, FaReddit, FaTiktok, FaSnapchat, FaTumblr 
} from 'react-icons/fa';

// Function to get the appropriate icon based on the URL
export const getIconForUrl = (url: string): JSX.Element | null => {
  if (url.includes("github.com"))
    return <FaGithub className="text-[#333] text-[1.2rem]" />; // GitHub icon color
  if (url.includes("twitter.com"))
    return <FaTwitter className="text-[#1DA1F2] text-[1.2rem]" />; // Twitter icon color
  if (url.includes("linkedin.com"))
    return <FaLinkedin className="text-[#0077B5] text-[1.2rem]" />; // LinkedIn icon color
  if (url.includes("facebook.com"))
    return <FaFacebook className="text-[#1877F2] text-[1.2rem]" />; // Facebook icon color
  if (url.includes("instagram.com"))
    return <FaInstagram className="text-[#C13584] text-[1.2rem]" />; // Instagram icon color
  if (url.includes("youtube.com"))
    return <FaYoutube className="text-[#FF0000] text-[1.2rem]" />; // YouTube icon color
  if (url.includes("pinterest.com"))
    return <FaPinterest className="text-[#E60023] text-[1.2rem]" />; // Pinterest icon color
  if (url.includes("reddit.com"))
    return <FaReddit className="text-[#FF4500] text-[1.2rem]" />; // Reddit icon color
  if (url.includes("tiktok.com"))
    return <FaTiktok className="text-[#000000] text-[1.2rem]" />; // TikTok icon color
  if (url.includes("snapchat.com"))
    return <FaSnapchat className="text-[#FFFC00] text-[1.2rem]" />; // Snapchat icon color
  if (url.includes("tumblr.com"))
    return <FaTumblr className="text-[#35465C] text-[1.2rem]" />; // Tumblr icon color
  // Add more mappings here if needed
  return null;
};
