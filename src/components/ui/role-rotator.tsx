"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import DecryptedText from "@/components/text-effects/DecryptedText";
import TextType from "@/components/text-effects/TextType";

type RoleRotatorProps = {
  phrases: readonly string[];
  className?: string;
};

type Phase = "intro" | "pause" | "decrypt" | "transition";

const HOLD_DURATION_MS = 5000;
const INTRO_PAUSE_MS = 1000;
const ENCRYPTION_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function buildEncryptedText(value: string) {
  return value
    .split("")
    .map((char) =>
      char === " " ? " " : ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)],
    )
    .join("");
}

export function RoleRotator({ phrases, className = "" }: RoleRotatorProps) {
  const safePhrases = useMemo(() => phrases.filter(Boolean), [phrases]);
  const encryptedPhrases = useMemo(
    () => safePhrases.map((phrase) => buildEncryptedText(phrase)),
    [safePhrases],
  );
  const longestPhrase = useMemo(
    () =>
      safePhrases.reduce(
        (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
        safePhrases[0] ?? "",
      ),
    [safePhrases],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [pausedEncryptedText, setPausedEncryptedText] = useState("");

  useEffect(() => {
    if (phase !== "decrypt") {
      return;
    }

    const holdTimer = setTimeout(() => {
      setPhase("transition");
    }, HOLD_DURATION_MS);

    return () => clearTimeout(holdTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "pause") {
      return;
    }

    const pauseTimer = setTimeout(() => {
      setPhase("decrypt");
    }, INTRO_PAUSE_MS);

    return () => clearTimeout(pauseTimer);
  }, [phase]);

  if (safePhrases.length === 0) {
    return null;
  }

  const currentPhrase = safePhrases[activeIndex];
  const currentEncrypted = encryptedPhrases[activeIndex];
  const nextIndex = (activeIndex + 1) % safePhrases.length;
  const nextEncrypted = encryptedPhrases[nextIndex];

  let content: ReactNode;

  if (phase === "intro") {
    content = (
      <>
        <TextType
          key={`intro-${activeIndex}`}
          text={currentEncrypted}
          typingSpeed={92}
          deletingSpeed={64}
          pauseDuration={0}
          loop={false}
          variableSpeed={{ min: 82, max: 130 }}
          cursorCharacter="_"
          cursorBlinkDuration={0.55}
          showCursor
          onSentenceComplete={() => {}}
          onTypingComplete={() => {
            setPausedEncryptedText(currentEncrypted);
            setPhase("pause");
          }}
          onDeletingComplete={() => {}}
        />
      </>
    );
  } else if (phase === "pause") {
    content = (
      <>
        <span className="inline-block whitespace-pre-line">
          {pausedEncryptedText}
          <span className="ml-1 inline-block animate-pulse text-black/70">_</span>
        </span>
      </>
    );
  } else if (phase === "transition") {
    content = (
      <>
        <TextType
          key={`transition-${activeIndex}`}
          text={[currentPhrase, nextEncrypted]}
          typingSpeed={92}
          deletingSpeed={64}
          pauseDuration={0}
          loop={false}
          variableSpeed={{ min: 82, max: 130 }}
          cursorCharacter="_"
          cursorBlinkDuration={0.55}
          showCursor
          initialDisplayedText={currentPhrase}
          initialCharIndex={currentPhrase.length}
          initialIsDeleting
          onSentenceComplete={() => {}}
          onTypingComplete={(_text: string, textIndex: number) => {
            if (textIndex === 1) {
              setActiveIndex(nextIndex);
              setPausedEncryptedText(nextEncrypted);
              setPhase("pause");
            }
          }}
          onDeletingComplete={() => {}}
        />
      </>
    );
  } else if (phase === "decrypt") {
    content = (
      <>
        <DecryptedText
          key={`decrypt-${activeIndex}`}
          text={currentPhrase}
          speed={88}
          maxIterations={18}
          sequential
          revealDirection="start"
          animateOn="load"
          className=""
          encryptedClassName="text-black/18"
          parentClassName="inline-block"
        />
      </>
    );
  } else {
    content = null;
  }

  return (
    <div className={`relative pr-[0.45em] ${className}`}>
      <span aria-hidden="true" className="invisible block whitespace-pre-line">
        {longestPhrase}
        <span className="ml-1 inline-block">_</span>
      </span>
      <div className="absolute inset-0">
        {content}
      </div>
    </div>
  );
}
