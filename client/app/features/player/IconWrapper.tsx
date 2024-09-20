import { ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function IconWrapper({children, onClick}: IconWrapperProps) {
  return (
    <div
      className={"size-6 text-gray-400 transition-all hover:scale-110 hover:text-white"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};