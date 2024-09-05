'use client';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import StoreProvider from "@/app/StoreProvider";
import MiniDrawer from "@/app/features/drawer/Drawer";
import Player from "@/app/features/player/Player";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";

export default function ClientProviders({children}: {children: ReactNode}) {
  const theme = createTheme({
    palette: {
      mode: "dark",
    }
  });

  return (
    <AppRouterCacheProvider>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <MiniDrawer/>

          {children}

          <Player/>
        </ThemeProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
};