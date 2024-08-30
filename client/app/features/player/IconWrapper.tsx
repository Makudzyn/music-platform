import { IconButton } from "@mui/material";
import { ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function IconWrapper({children, onClick}: IconWrapperProps) {
  return (
    <IconButton
      sx={{
        width: 24,
        height: 24,
        color: '#b3b3b3',
        transition: 'transform 0.3s',
        '&:hover': {transform: 'scale(1.1)', color: 'white'}
      }}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};