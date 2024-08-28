import { SvgProps } from "@/utils/svgprops";
import * as React from "react";

export const EmailIcon = (props: SvgProps) => {
  return (
    <svg
      viewBox="-0.5 -0.5 20 20"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      width={20}
      {...props}
    >
      <path
        d="M9.5 7.964a1.536 1.536 0 110 3.072 1.536 1.536 0 010-3.072z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.553 1.553C.19 2.917.19 5.111.19 9.5s0 6.583 1.363 7.947C2.917 18.81 5.111 18.81 9.5 18.81s6.583 0 7.947-1.363c1.363-1.364 1.363-3.558 1.363-7.947s0-6.583-1.363-7.947C16.083.19 13.889.19 9.5.19s-6.583 0-7.947 1.363zM4.613 9.5a4.888 4.888 0 119.481 1.673.742.742 0 01-.201.284l-.075.069a.825.825 0 01-1.385-.607V9.5a2.933 2.933 0 10-1.189 2.358 2.221 2.221 0 003.52.694l.076-.07a2.13 2.13 0 00.566-.83A6.284 6.284 0 109.5 15.784a.698.698 0 000-1.397A4.888 4.888 0 014.612 9.5z"
        fill="#fff"
      />
    </svg>
  );
};

export default EmailIcon;
