import React from "react";

export default function UserIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: props.width, height: props.height }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

UserIcon.defaultProps = {
  width: "2.5rem",
  height: "2.5rem",
};
