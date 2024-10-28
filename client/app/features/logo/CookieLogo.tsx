import Image from "next/image";
import CookieIcon from "@/app/features/logo/cookie-icon.svg";

export default function CookieLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-foreground">
      <Image src={CookieIcon} width={42} height={42} alt={"Cookie logo"} priority/>
      <p className="font-semibold text-lg ml-2">Cookie Music</p>
    </div>
  );
};