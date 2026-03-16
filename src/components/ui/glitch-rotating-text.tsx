"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HOLD_DURATION_MS = 5000;
const TYPE_FRAME_MS = 60;
const DECRYPT_FRAME_MS = 42;
const DELETE_FRAME_MS = 44;

type GlitchRotatingTextProps = {
  phrases: readonly string[];
  className?: string;
};

type AnimationPhase = "typing" | "decrypting" | "holding" | "deleting";

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function buildEncryptedPrefix(target: string, length: number) {
  return target
    .slice(0, length)
    .split("")
    .map((char) => (char === " " ? " " : randomChar()))
    .join("");
}

function decryptPhrase(target: string, revealedCount: number) {
  return target
    .split("")
    .map((char, index) => {
      if (char === " ") {
        return " ";
      }

      return index < revealedCount ? char : randomChar();
    })
    .join("");
}

export function GlitchRotatingText({
  phrases,
  className = "",
}: GlitchRotatingTextProps) {
  const safePhrases = phrases.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayText, setDisplayText] = useState(safePhrases[0] ?? "");
  const [phase, setPhase] = useState<AnimationPhase>("typing");

  useEffect(() => {
    if (safePhrases.length <= 1) {
      return;
    }

    let typingInterval: ReturnType<typeof setInterval> | undefined;
    let decryptInterval: ReturnType<typeof setInterval> | undefined;
    let deleteInterval: ReturnType<typeof setInterval> | undefined;
    let holdTimeout: ReturnType<typeof setTimeout> | undefined;

    const nextIndex = (activeIndex + 1) % safePhrases.length;
    const currentPhrase = safePhrases[activeIndex] ?? "";
    const bootTimeout = setTimeout(() => {
      let typedLength = 0;
      setPhase("typing");
      setDisplayText("");

      typingInterval = setInterval(() => {
        typedLength += 1;
        setDisplayText(buildEncryptedPrefix(currentPhrase, typedLength));

        if (typedLength >= currentPhrase.length) {
          clearInterval(typingInterval);

          let revealedCount = 0;
          setPhase("decrypting");

          decryptInterval = setInterval(() => {
            revealedCount += 1;
            setDisplayText(decryptPhrase(currentPhrase, revealedCount));

            if (revealedCount >= currentPhrase.length) {
              clearInterval(decryptInterval);
              setDisplayText(currentPhrase);
              setPhase("holding");

              holdTimeout = setTimeout(() => {
                let deleteLength = currentPhrase.length;
                setPhase("deleting");

                deleteInterval = setInterval(() => {
                  deleteLength -= 1;
                  setDisplayText(currentPhrase.slice(0, Math.max(deleteLength, 0)));

                  if (deleteLength <= 0) {
                    clearInterval(deleteInterval);
                    setActiveIndex(nextIndex);
                  }
                }, DELETE_FRAME_MS);
              }, HOLD_DURATION_MS);
            }
          }, DECRYPT_FRAME_MS);
        }
      }, TYPE_FRAME_MS);
    }, 0);

    return () => {
      clearTimeout(bootTimeout);

      if (typingInterval) clearInterval(typingInterval);
      if (decryptInterval) clearInterval(decryptInterval);
      if (deleteInterval) clearInterval(deleteInterval);
      if (holdTimeout) clearTimeout(holdTimeout);
    };
  }, [activeIndex, safePhrases]);

  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10 block whitespace-pre-line">{displayText}</span>
      {phase === "typing" || phase === "decrypting" ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 block translate-x-[0.02em] whitespace-pre-line text-black/20"
          >
            {displayText}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 block -translate-x-[0.03em] whitespace-pre-line text-black/12"
          >
            {displayText}
          </span>
        </>
      ) : null}
    </div>
  );
}
