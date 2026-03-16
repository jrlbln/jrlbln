import type { ReactNode } from "react";

type PanelFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PanelFrame({ children, className = "" }: PanelFrameProps) {
  return (
    <article
      className={`grid min-w-full flex-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] md:gap-8 ${className}`.trim()}
    >
      {children}
    </article>
  );
}
