import type { ReactNode } from "react";
import { MagicRings } from "@/components/ui/magic-rings";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-5 pb-8 sm:px-6 sm:pt-6 sm:pb-10 md:px-8 md:pt-8 md:pb-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(98vh,920px)] w-[max(100vw,1500px)] -translate-x-1/2 -translate-y-1/2">
        <MagicRings
          className="h-full w-full"
          color="#111111"
          colorTwo="#6f6f6f"
          ringCount={6}
          speed={1}
          attenuation={16}
          lineThickness={3}
          baseRadius={0.48}
          radiusStep={0.11}
          scaleRate={0.12}
          opacity={0.92}
          blur={0}
          noiseAmount={0.015}
          rotation={0}
          ringGap={1.45}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>
      <div className="relative z-10 flex w-full items-center justify-center">{children}</div>
    </main>
  );
}
