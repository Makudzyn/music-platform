import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className={"flex flex-col justify-center mt-32 items-center w-full h-full"}>
      <Typography variant="h1">Welcome!</Typography>
      <Typography variant="h3">The best platform for your music.</Typography>
    </div>
  );
}
