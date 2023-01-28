import React from 'react';

// https://react-svgr.com/playground/
type Props = JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>;

export const DeleteIcon = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={50}
      height={50}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      {...props}>
      <g fill="currentColor">
        <path d="M124.5 82.2c-2.7.5-8.7 2.7-13.2 4.8-14.5 7-25.5 21-28.8 36.7-2.2 10.1-2.2 254.5 0 264.6 4.3 20.3 22.4 37.9 42.9 41.6 4 .8 46.6 1.1 131 1.1 138.7 0 132.6.2 145.7-6.6 13.9-7.3 25.1-22.5 27.8-37.8 1.5-8.3 1.5-252.9 0-261.2-2.7-15.3-13.9-30.5-27.8-37.8-13.1-6.8-6.9-6.6-146.6-6.5-74 .1-128.1.5-131 1.1zm138 63.2c21.6 6.6 32.8 27.1 29.7 54.4-2.6 22.1-10 39.5-20.8 49.1-11.7 10.2-28.8 12.6-43.3 5.8-10.8-5-20.5-18.6-25.5-35.9-13.3-46.2 5.3-77.1 45.4-75.4 5.2.3 11.8 1.2 14.5 2zm-49.7 111.7c18.1 15.9 47.3 15.9 65.3 0l4.7-4.1 5.3 2.4c3 1.3 8.9 3.6 13.3 5.1 7.5 2.7 15.5 7.7 16.4 10.2.2.9-1 1.3-4 1.3-6.8 0-16.5 2.7-23.9 6.6-25.8 13.6-36.2 45.6-23.4 72 1.9 3.8 3.2 7 3 7.2-1 1.1-23.4 2.2-32 1.7-28.5-1.8-69.6-11.2-76.3-17.3-2.5-2.4-2.5-2.5-1.9-14 .6-11.7 4.3-34.3 7.2-43.7 2.2-7.5 7.1-15.2 11.6-18.4 2.2-1.6 7.9-4.3 12.7-6 4.8-1.7 10.5-4 12.7-5 2.2-1.1 4.2-2 4.3-2 .2-.1 2.5 1.7 5 4zm122.4 28.1c13.8 6.5 22.9 18.9 25.1 34 4.1 28.5-22 53.9-50.3 49-14.5-2.5-26.7-11.6-33.1-24.7-3.3-6.7-3.4-7.4-3.4-18.5 0-10.8.2-11.9 3.1-18 5.6-11.7 14.3-19.5 26.3-23.7 5.5-2 8.1-2.3 15.8-2 7.9.4 10.1.9 16.5 3.9z" />
        <path d="M292.6 319.6c-2.7 2.7-3.1 6.3-.9 9.2l2 2.7 22.6.3c21.6.2 22.8.1 24.7-1.8 2.4-2.4 2.6-6.7.4-9.8-1.5-2.2-1.9-2.2-24.4-2.2-19.4 0-23.1.2-24.4 1.6z" />
      </g>
    </svg>
  );
};

export const AttentionIcon = (props: Props) => {
  return (
    <svg
      className="w-6 h-6 text-red-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
};