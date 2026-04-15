"use client";

import { siteConfig } from "@/config/site";
import { homePanels } from "@/data/home";
import { CardVisual } from "@/components/panels/card-visual";
import { PanelFrame } from "@/components/panels/panel-frame";
import { RoleRotator } from "@/components/ui/role-rotator";

type HomePanelProps = {
  onGoToPanel: (panelId: (typeof homePanels)[number]["id"]) => void;
};

export function HomePanel({ onGoToPanel }: HomePanelProps) {
  const panel = homePanels[0];
  const cta = panel.cta;

  return (
    <PanelFrame className="h-full">
      <div className="max-w-xl flex h-full flex-col">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/45">
          {panel.eyebrow}
        </p>
        <div className="flex flex-1 flex-col">
          <div className="flex min-h-[200px] items-center md:min-h-[220px]">
            <RoleRotator
              phrases={siteConfig.rotatingRoles}
              className="w-[11.75ch] text-[clamp(3.2rem,5.2vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.09em] text-foreground"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-(--color-text-muted) sm:text-[0.98rem]">
            {panel.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onGoToPanel(cta.target)}
              className="inline-flex items-center gap-3 rounded-full border border-transparent bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="space-y-5">
            <ul className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-black/42 sm:gap-6">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-flex items-start gap-1 transition-opacity hover:opacity-100"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-[0.55rem] leading-none text-black/38"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-black/34">
                {siteConfig.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col">
        <CardVisual variant={panel.aside} />
        <div className="mt-auto flex items-center justify-start gap-3 pt-8 md:justify-end">
          {siteConfig.documents.map((document) => (
            <a
              key={document.label}
              href={document.href}
              download
              className="inline-flex shrink-0 items-center rounded-full border border-black/10 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-black/60 transition-colors hover:border-black/25 hover:text-black"
            >
              Download {document.label}
            </a>
          ))}
        </div>
      </div>
    </PanelFrame>
  );
}
