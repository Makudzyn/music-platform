'use client';

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import Image from "next/image";
import CookieIcon from "./cookie-icon.svg";
import { Box } from "@mui/material";
import Search from "@/app/features/header/Search";

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  drawerWidth: number;
}

// Styled component with dynamic styles based on `open` and `drawerWidth`
const Appbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: "72px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps extends MuiAppBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  drawerWidth: number;
}

// Main Header component
const Header = ({ open, setOpen, drawerWidth }: HeaderProps) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Appbar position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, color: "#fff", ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: "13rem"}}>
          <Image src={CookieIcon} alt={"Cookie Logo"} width={42} height={42}/>
          <Typography variant="h6" noWrap component="div" color={"white"} fontSize={24}>Cookie Music</Typography>
        </Box>
        <Search/>
      </Toolbar>
    </Appbar>
  );
};

export default Header;
