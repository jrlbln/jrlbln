import { homePanels } from "@/data/home";
import { CardVisual } from "@/components/panels/card-visual";
import { PanelFrame } from "@/components/panels/panel-frame";

export function AboutPanel() {
  const panel = homePanels[1];

  return (
    <PanelFrame className="items-center">
      <div className="max-w-2xl flex h-full flex-col">
        <div className="flex flex-1 flex-col">
          <div className="flex min-h-[220px] items-start">
            <h1 className="max-w-[19ch] text-[clamp(2.8rem,4.4vw,4.3rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-foreground">
              {panel.title}
            </h1>
          </div>
          <p className="mt-5 max-w-xl text-justify text-sm leading-7 text-(--color-text-muted) sm:text-[0.98rem]">
            {panel.description}
          </p>
        </div>

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-black/42 sm:gap-6">
            {panel.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <CardVisual variant={panel.aside} />
    </PanelFrame>
  );
}
