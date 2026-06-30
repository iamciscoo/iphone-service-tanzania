"use client";

import { memo, type ReactNode, useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function RevealComponent({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0px)" },
          ],
          {
            duration: 550,
            delay: delay * 1000,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        observer.unobserve(element);
      },
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}

export const Reveal = memo(RevealComponent);
