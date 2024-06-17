import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoTag } from "react-icons/go";
import { SlUserFollowing } from "react-icons/sl";
export const panelItems = [
  {
    name: "Home",
    path: "/dashboard",
    icon: React.createElement(IoHomeOutline, null),
  },
  {
    name: "Profile",
    path: "/profile",
    icon: React.createElement(CgProfile, null),
  },
  {
    name: "Saved",
    path: "/saved",
    icon: React.createElement(GoTag, null),
  },
  {
    name: "Following",
    path: "/following",
    icon: React.createElement(SlUserFollowing, null),
  },
];
