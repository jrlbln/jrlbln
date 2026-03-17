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
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 18 });

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

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (window.innerWidth < 768) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setTilt({
      rotateX: (0.5 - y) * 5,
      rotateY: (x - 0.5) * 7,
      glareX: x * 100,
      glareY: y * 100,
    });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 18 });
  }

  return (
    <div
      className="relative w-full max-w-[1180px] [perspective:2400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-x-[4%] top-8 bottom-[-2.5rem] rounded-[2.3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(210,210,210,0.22))] shadow-[0_55px_120px_rgba(0,0,0,0.1)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-[1.1rem] inset-y-[1rem] rounded-[2.15rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(236,236,236,0.34))] shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_0_-1px_0_rgba(0,0,0,0.06)] md:[transform:translate3d(0,10px,-1px)]" />
      <section
        className="relative w-full overflow-hidden rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,250,250,0.88))] px-6 py-6 shadow-[0_18px_40px_rgba(255,255,255,0.7)_inset,0_-18px_30px_rgba(0,0,0,0.035)_inset,0_26px_80px_rgba(0,0,0,0.09)] [transform-style:preserve-3d] transition-transform duration-200 ease-out md:px-10 md:py-7"
        style={{
          transform:
            typeof window !== "undefined" && window.innerWidth >= 768
              ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
              : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.98), transparent 28%), radial-gradient(circle at 85% 18%, rgba(255,255,255,0.8), transparent 20%), linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72))`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_74%,rgba(255,255,255,0.42)_100%)] opacity-75" />
        <div className="relative flex h-[min(620px,calc(100vh-6rem))] min-h-[500px] flex-col md:h-[min(620px,calc(100vh-7rem))]">
          <header className="flex items-center justify-between gap-6">
            <Monogram />
            <nav aria-label="Primary">
              <ul className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/55 md:gap-4">
                {homePanels.map((item, index) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={`rounded-full px-3 py-2 transition-opacity hover:opacity-100 md:px-4 ${
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
    </div>
  );
}
