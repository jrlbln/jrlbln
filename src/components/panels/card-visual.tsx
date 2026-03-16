type CardVisualProps = {
  variant: "sculpture" | "statement" | "selected" | "contact";
};

export function CardVisual({ variant }: CardVisualProps) {
  if (variant === "statement") {
    return (
      <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center md:max-w-[460px]">
        <div className="absolute inset-x-[12%] inset-y-[12%] rounded-full border border-black/8 bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(234,234,234,0.78),transparent_72%)] animate-float-slow" />
        <div className="absolute h-[66%] w-[66%] rounded-full border border-black/70" />
        <div className="absolute h-[46%] w-[46%] rounded-full border border-black/18" />
        <div className="absolute h-[2px] w-[64%] bg-black" />
        <div className="absolute h-[64%] w-[2px] bg-black" />
        <div className="absolute right-[16%] top-[22%] text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-black/35">
          restrained
        </div>
      </div>
    );
  }

  if (variant === "selected") {
    return (
      <div className="relative mx-auto flex h-[320px] w-full max-w-[500px] items-center justify-center md:h-[460px]">
        <div className="absolute inset-0 rounded-[2rem] border border-black/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(239,239,239,0.66))]" />
        <div className="absolute left-[12%] top-[14%] h-[32%] w-[32%] rounded-[1.8rem] bg-black animate-float-fast" />
        <div className="absolute right-[12%] top-[14%] h-[32%] w-[32%] rounded-[1.8rem] border border-black/14 bg-white" />
        <div className="absolute bottom-[14%] left-[12%] h-[32%] w-[32%] rounded-[1.8rem] border border-black/14 bg-white" />
        <div className="absolute bottom-[14%] right-[12%] h-[32%] w-[32%] rounded-[1.8rem] bg-[linear-gradient(135deg,#111,#3a3a3a)] animate-float-slow" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white" />
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center md:max-w-[460px]">
        <div className="absolute left-1/2 top-1/2 z-0 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/8 bg-[radial-gradient(circle,rgba(255,255,255,0.96),rgba(239,239,239,0.7),transparent_76%)] animate-pulse-soft" />
        <div className="absolute left-1/2 top-1/2 z-10 flex h-[62%] w-[72%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-black/12 bg-[rgba(255,255,255,0.78)] shadow-[0_18px_36px_rgba(0,0,0,0.06)] backdrop-blur">
          <div className="text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-black/38">
              contact
            </p>
            <p className="mt-5 text-4xl font-semibold tracking-[-0.08em] text-black">
              Let&apos;s build
            </p>
            <p className="mt-3 text-sm text-black/48">Focused, quiet, intentional.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center md:max-w-[460px]">
      <div className="absolute inset-x-[10%] inset-y-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(240,240,240,0.86)_48%,transparent_72%)] blur-sm" />
      <div className="absolute h-[78%] w-[78%] rounded-full border border-black/6 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(240,240,240,0.68),rgba(255,255,255,0.25))] animate-float-slow" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-black" />
      <div className="absolute left-1/2 top-1/2 h-10 w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-black" />
      <div className="relative h-[74%] w-[58%] animate-float-fast">
        <div className="absolute inset-x-[18%] top-[8%] h-[26%] rounded-[50%] bg-[linear-gradient(180deg,#fafafa,#dddddd)] shadow-[inset_0_-10px_18px_rgba(0,0,0,0.08)]" />
        <div className="absolute left-[26%] top-[20%] h-[18%] w-[48%] rounded-[48%] bg-[linear-gradient(180deg,#f8f8f8,#d8d8d8)]" />
        <div className="absolute inset-x-[14%] top-[22%] bottom-[8%] rounded-[42%_42%_34%_34%/28%_28%_46%_46%] bg-[linear-gradient(180deg,#fbfbfb_0%,#ebebeb_38%,#d4d4d4_100%)] shadow-[inset_10px_0_30px_rgba(255,255,255,0.75),inset_-14px_-10px_24px_rgba(0,0,0,0.08),0_28px_36px_rgba(0,0,0,0.08)]" />
        <div className="absolute left-[28%] top-[42%] h-[10%] w-[14%] rounded-full bg-black/6 blur-[1px]" />
        <div className="absolute right-[29%] top-[42%] h-[10%] w-[14%] rounded-full bg-black/6 blur-[1px]" />
        <div className="absolute left-[38%] top-[55%] h-[4%] w-[24%] rounded-full bg-black/8 blur-[1px]" />
        <div className="absolute left-[41%] top-[68%] h-[18%] w-[18%] rounded-[40%] bg-[linear-gradient(180deg,#efefef,#cfcfcf)]" />
      </div>
    </div>
  );
}
