"use client";

import React, { useEffect, useState } from "react";

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  initialDisplayText,
  ...props
}) {
  const baseDisplayText = initialDisplayText ?? text;
  const [displayText, setDisplayText] = useState(baseDisplayText);
  const [isHovering, setIsHovering] = useState(animateOn === "load");

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextChar = (originalChar) => {
      if (useOriginalCharsOnly) {
        const matchingChars = characters
          .split("")
          .filter((char) => text.includes(char));
        return (
          matchingChars[Math.floor(Math.random() * matchingChars.length)] ||
          originalChar
        );
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const shuffleText = () => {
      if (sequential) {
        const revealIndex =
          revealDirection === "start"
            ? currentIteration
            : revealDirection === "end"
              ? text.length - 1 - currentIteration
              : Math.floor(text.length / 2) +
                (currentIteration % 2 === 0
                  ? currentIteration / 2
                  : -(currentIteration + 1) / 2);

        setDisplayText((prevText) =>
          prevText
            .split("")
            .map((char, idx) => {
              if (idx === revealIndex) return text[idx];
              if (idx < currentIteration && revealDirection === "start")
                return text[idx];
              if (
                idx > text.length - 1 - currentIteration &&
                revealDirection === "end"
              )
                return text[idx];
              return getNextChar(text[idx]);
            })
            .join(""),
        );
      } else {
        setDisplayText((prevText) =>
          prevText
            .split("")
            .map((char, idx) =>
              char === text[idx] ? char : getNextChar(text[idx]),
            )
            .join(""),
        );
      }

      currentIteration += 1;

      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    };

    if (isHovering) {
      interval = setInterval(shuffleText, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    useOriginalCharsOnly,
    characters,
  ]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => {
            setDisplayText(baseDisplayText);
            setIsHovering(true);
          },
          onMouseLeave: () => {
            setIsHovering(false);
            setDisplayText(baseDisplayText);
          },
        }
      : {};

  const displayLines = displayText.split("\n");
  const textLines = text.split("\n");

  return (
    <span className={parentClassName} {...hoverProps} {...props}>
      <span className={className}>
        {displayLines.map((line, lineIndex) => {
          const targetLine = textLines[lineIndex] ?? "";

          return (
            <span key={lineIndex} className="block">
              {line.split("").map((char, charIndex) => (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className={
                    char !== targetLine[charIndex] ? encryptedClassName : ""
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </span>
  );
}
