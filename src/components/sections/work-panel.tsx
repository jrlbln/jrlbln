"use client";

import Image from "next/image";
import { homePanels } from "@/data/home";
import { CardVisual } from "@/components/panels/card-visual";
import { PanelFrame } from "@/components/panels/panel-frame";

const workStackIcons = [
  { label: "Expo", src: "/tech-stack-icons/expo.svg", size: 24 },
  { label: "Next.js", src: "/tech-stack-icons/next.svg", size: 24 },
  { label: "Flutter", src: "/tech-stack-icons/flutter.svg", size: 24 },
  { label: "Firebase", src: "/tech-stack-icons/firebase.svg", size: 24 },
  { label: "Supabase", src: "/tech-stack-icons/supabase.svg", size: 24 },
  { label: "Convex", src: "/tech-stack-icons/convex.svg", size: 36 },
] as const;

export function WorkPanel() {
  const panel = homePanels[2];

  return (
    <PanelFrame className="items-center">
      <div className="max-w-xl flex h-full flex-col">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/45">
          {panel.eyebrow}
        </p>
        <div className="flex flex-1 flex-col">
          <div className="flex min-h-[220px] items-start">
            <h1 className="max-w-[15ch] text-[clamp(2.8rem,4.4vw,4.3rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[var(--color-text)]">
              {panel.title}
            </h1>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-muted)] sm:text-[0.98rem]">
            {panel.description}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap items-end gap-4 pl-4">
            {workStackIcons.map((item) => (
              <li key={item.label} className="group relative flex flex-col items-center">
                <span className="pointer-events-none absolute bottom-full mb-3 rounded-full border border-black/10 bg-white px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-black/56 opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                  {item.label}
                </span>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={item.size}
                    height={item.size}
                    className={item.label === "Convex" ? "h-9 w-9 object-contain grayscale" : "h-6 w-6 object-contain grayscale"}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CardVisual variant={panel.aside} />
    </PanelFrame>
  );
}
