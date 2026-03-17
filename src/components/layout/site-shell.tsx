import type { ReactNode } from "react";
import { PixelSnow } from "@/components/ui/pixel-snow";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-5 pb-8 sm:px-6 sm:pt-6 sm:pb-10 md:px-8 md:pt-8 md:pb-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(98vh,920px)] w-[max(100vw,1500px)] -translate-x-1/2 -translate-y-1/2">
        <PixelSnow
          className="h-full w-full"
          color="#111111"
          flakeSize={0.018}
          minFlakeSize={1.6}
          pixelResolution={200}
          speed={1.4}
          density={0.12}
          direction={125}
          brightness={1.15}
          depthFade={3.2}
          farPlane={8}
          gamma={0.4545}
          variant="square"
        />
      </div>
      <div className="relative z-10 flex w-full items-center justify-center">{children}</div>
    </main>
  );
}
