"use client";

import { useState } from "react";
import { homePanels } from "@/data/home";
import { Monogram } from "@/components/ui/monogram";
import { HomePanel } from "@/components/sections/home-panel";
import { AboutPanel } from "@/components/sections/about-panel";
import { WorkPanel } from "@/components/sections/work-panel";
import { CredentialsPanel } from "@/components/sections/credentials-panel";

export function HeroCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function goToPanel(panelId: (typeof homePanels)[number]["id"]) {
    const nextIndex = homePanels.findIndex((item) => item.id === panelId);

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  }

  function handleTouchStart(clientX: number) {
    setTouchStart(clientX);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - clientX;
    const threshold = 48;

    if (distance > threshold) {
      setActiveIndex((current) => Math.min(current + 1, homePanels.length - 1));
    } else if (distance < -threshold) {
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    setTouchStart(null);
  }

  return (
    <section className="relative w-full max-w-[1180px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.06)] md:px-10 md:py-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.78))]" />
      <div className="relative flex h-[min(620px,calc(100vh-6rem))] min-h-[500px] flex-col md:h-[min(620px,calc(100vh-7rem))]">
        <header className="flex items-center justify-between gap-6">
          <Monogram />
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/55 md:gap-8">
              {homePanels.map((item, index) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    className={`transition-opacity hover:opacity-100 ${
                      activeIndex === index ? "opacity-100 text-black" : "opacity-55"
                    }`}
                    aria-pressed={activeIndex === index}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div
          className="relative flex-1 overflow-hidden py-6 md:py-2"
          onTouchStart={(event) => handleTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
        >
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            <HomePanel onGoToPanel={goToPanel} />
            <AboutPanel />
            <WorkPanel />
            <CredentialsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
