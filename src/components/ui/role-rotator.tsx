"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import TextType from "@/components/text-effects/TextType";

type RoleRotatorProps = {
  phrases: readonly string[];
  className?: string;
};

type Phase = "intro" | "pause" | "decrypt" | "transition";

const HOLD_DURATION_MS = 5000;
const INTRO_PAUSE_MS = 1000;
const DECRYPT_SPEED_MS = 88;
const ENCRYPTION_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function buildEncryptedText(value: string) {
  return value
    .split("")
    .map((char) =>
      /\s/.test(char) ? char : ENCRYPTION_CHARS[Math.floor(Math.random() * ENCRYPTION_CHARS.length)],
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
  const [decryptedDisplayText, setDecryptedDisplayText] = useState("");
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const currentPhrase = safePhrases[activeIndex] ?? "";
  const currentEncrypted = encryptedPhrases[activeIndex] ?? "";
  const nextIndex = safePhrases.length === 0 ? 0 : (activeIndex + 1) % safePhrases.length;
  const nextEncrypted = encryptedPhrases[nextIndex] ?? "";

  useEffect(() => {
    if (safePhrases.length === 0) {
      return;
    }

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

  useEffect(() => {
    if (phase !== "decrypt") {
      return;
    }

    const encryptedText = pausedEncryptedText || encryptedPhrases[activeIndex] || "";
    const revealOrder = currentPhraseCharacters(encryptedText).filter(
      ({ char }) => !/\s/.test(char),
    );

    setDecryptedDisplayText(encryptedText);
    setRevealedIndices(new Set());

    let revealPointer = 0;

    const decryptTimer = setInterval(() => {
      const nextItem = revealOrder[revealPointer];

      if (!nextItem) {
        clearInterval(decryptTimer);
        setDecryptedDisplayText(currentPhrase);
        return;
      }

      setDecryptedDisplayText((previous) => {
        const nextChars = previous.split("");
        nextChars[nextItem.index] = currentPhrase[nextItem.index];
        return nextChars.join("");
      });

      setRevealedIndices((previous) => {
        const next = new Set(previous);
        next.add(nextItem.index);
        return next;
      });

      revealPointer += 1;
    }, DECRYPT_SPEED_MS);

    return () => clearInterval(decryptTimer);
  }, [phase, pausedEncryptedText, encryptedPhrases, activeIndex, currentPhrase]);

  if (safePhrases.length === 0) {
    return null;
  }

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
        <span className="block whitespace-pre-line">{pausedEncryptedText}</span>
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
    const visibleDecryptText = decryptedDisplayText || pausedEncryptedText || currentEncrypted;

    content = (
      <>
        <span className="block whitespace-pre-line">
          {visibleDecryptText.split("").map((char, index) => (
            <span key={`${activeIndex}-${index}`}>
              {char}
            </span>
          ))}
        </span>
      </>
    );
  } else {
    content = null;
  }

  return (
    <div className={`relative ${className}`}>
      <span aria-hidden="true" className="invisible block whitespace-pre-line">
        {longestPhrase}
      </span>
      <div className="absolute inset-0 flex items-center">
        {content}
      </div>
    </div>
  );
}

function currentPhraseCharacters(value: string) {
  return value.split("").map((char, index) => ({ char, index }));
}
