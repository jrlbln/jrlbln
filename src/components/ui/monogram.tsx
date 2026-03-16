import Image from "next/image";

export function Monogram() {
  return (
    <div className="flex h-20 w-20 items-center justify-center">
      <Image
        src="/BLN_LOGO_WHITE.svg"
        alt="BLN logo"
        width={80}
        height={80}
        priority
        className="h-20 w-20"
      />
    </div>
  );
}
