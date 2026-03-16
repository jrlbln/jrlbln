'use client';

import React, { useEffect, useState } from 'react';

const getRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
  return chars[Math.floor(Math.random() * chars.length)];
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextChar = originalChar => {
      if (useOriginalCharsOnly) {
        const matchingChars = characters.split('').filter(char => text.includes(char));
        return matchingChars[Math.floor(Math.random() * matchingChars.length)] || originalChar;
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const shuffleText = () => {
      if (sequential) {
        const revealIndex =
          revealDirection === 'start'
            ? currentIteration
            : revealDirection === 'end'
              ? text.length - 1 - currentIteration
              : Math.floor(text.length / 2) + (currentIteration % 2 === 0 ? currentIteration / 2 : -(currentIteration + 1) / 2);

        setDisplayText(prevText =>
          prevText
            .split('')
            .map((char, idx) => {
              if (idx === revealIndex) return text[idx];
              if (idx < currentIteration && revealDirection === 'start') return text[idx];
              if (idx > text.length - 1 - currentIteration && revealDirection === 'end') return text[idx];
              return getNextChar(text[idx]);
            })
            .join('')
        );
      } else {
        setDisplayText(prevText =>
          prevText
            .split('')
            .map((char, idx) => (char === text[idx] ? char : getNextChar(text[idx])))
            .join('')
        );
      }

      currentIteration += 1;

      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
        setDisplayText(text);
      }
    };

    if (isHovering && !isScrambling) {
      setIsScrambling(true);
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
    isScrambling,
  ]);

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => {
            setIsHovering(false);
            setDisplayText(text);
          },
        }
      : {};

  useEffect(() => {
    if (animateOn === 'load') {
      setIsHovering(true);
    }
  }, [animateOn]);

  return (
    <span className={parentClassName} {...hoverProps} {...props}>
      <span className={className}>
        {displayText.split('').map((char, index) => (
          <span
            key={index}
            className={char !== text[index] ? encryptedClassName : ''}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
