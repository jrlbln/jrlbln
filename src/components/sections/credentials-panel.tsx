import { homePanels } from "@/data/home";
import { CardVisual } from "@/components/panels/card-visual";
import { PanelFrame } from "@/components/panels/panel-frame";

export function CredentialsPanel() {
  const panel = homePanels[3];
  const academics = [
    {
      level: "Bachelor's Degree",
      degree: "Bachelor of Science in Information Technology",
      school: "Polytechnic University of the Philippines",
      period: "2023 - 2025",
      highlights: [
        "Graduated Cum Laude",
        "GWA: 1.40",
        "Capstone: AgriCTRL+ (rice grain tracing and review system for NFA)",
      ],
    },
    {
      level: "Diploma",
      degree: "Diploma in Information Communication Technology",
      school:
        "Polytechnic University of the Philippines (Institute of Technology)",
      period: "2020 - 2023",
      highlights: [
        "GWA: 1.31",
        "Capstone: VarietEase (mobile retail POS analysis)",
      ],
    },
  ] as const;

  return (
    <PanelFrame className="items-center">
      <div className="flex h-full w-full max-w-2xl flex-col justify-center">
        <div className="grid gap-4">
          {academics.map((entry) => (
            <section
              key={entry.degree}
              className="rounded-2xl border border-black/10 bg-white/55 px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.035)] backdrop-blur-[2px]"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-black/45">
                  {entry.level}
                </span>
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-black/40">
                  {entry.period}
                </span>
              </div>

              <h2 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {entry.degree}
              </h2>
              <p className="mt-1 text-sm text-(--color-text-muted)">
                {entry.school}
              </p>

              <ul className="mt-4 space-y-2">
                {entry.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-6 text-(--color-text-muted)"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <CardVisual variant={panel.aside} />
    </PanelFrame>
  );
}
