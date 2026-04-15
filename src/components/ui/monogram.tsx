import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Monogram() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/BLN_LOGO_WHITE.svg"
        alt="BLN logo"
        width={80}
        height={80}
        priority
        className="h-20 w-20"
      />
      <span className="text-base font-semibold uppercase tracking-[0.18em] text-black/85 md:text-xl">
        {siteConfig.name}
      </span>
    </div>
  );
}
