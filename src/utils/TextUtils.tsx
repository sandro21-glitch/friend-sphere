import React from "react";
import { getIconForUrl } from "./IconUtils";

// Function to parse text and replace URLs with icons
export const parseBioText = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlPattern);

  return parts.map((part, index) =>
    urlPattern.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-blue-500"
      >
        {getIconForUrl(part)}
      </a>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
};
