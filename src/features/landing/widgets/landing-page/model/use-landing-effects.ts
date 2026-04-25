'use client';

import { useEffect } from 'react';

const TYPING_PHRASES = [
  'Hi! How can I help you today?',
  'Let me build your next lesson ✨',
  'Vocabulary → drills in 2 minutes!',
] as const;

export function useLandingEffects() {
  useEffect(() => {
    const nav = document.getElementById('nav');

    const handleScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const typedEl = document.getElementById('typed-text');

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const type = () => {
      if (!typedEl || cancelled) return;

      const phrase = TYPING_PHRASES[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        typedEl.textContent = phrase.slice(0, charIndex);

        if (charIndex === phrase.length) {
          deleting = true;
          typingTimer = setTimeout(type, 2200);
          return;
        }

        typingTimer = setTimeout(type, 52);
        return;
      }

      charIndex -= 1;
      typedEl.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        typingTimer = setTimeout(type, 380);
        return;
      }

      typingTimer = setTimeout(type, 28);
    };

    typingTimer = setTimeout(type, 900);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('visible');

          const children = entry.target.querySelectorAll<HTMLElement>(
            '.step,.feat,.task,.testi,.stat-n,.tg-card,.fc',
          );

          children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
            child.style.transitionDelay = `${index * 85}ms`;

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              });
            });
          });
        });
      },
      { threshold: 0.08 },
    );

    const revealElements = document.querySelectorAll<HTMLElement>('.landing-page .reveal');
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      cancelled = true;

      window.removeEventListener('scroll', handleScroll);

      if (typingTimer) {
        clearTimeout(typingTimer);
      }

      observer.disconnect();
    };
  }, []);
}
