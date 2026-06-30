"use client";

import { type ComponentType, type ReactNode, useEffect, useState } from "react";
import type { GlassProps } from "@samasante/liquid-glass";

type LiquidGlassFrameProps = {
  children: ReactNode;
  className: string;
};

export function LiquidGlassFrame({ children, className }: LiquidGlassFrameProps) {
  const [GlassComponent, setGlassComponent] = useState<ComponentType<GlassProps> | null>(null);

  useEffect(() => {
    let active = true;

    import("@samasante/liquid-glass")
      .then((module) => {
        if (active) setGlassComponent(() => module.Glass);
      })
      .catch(() => {
        // The CSS material remains as a resilient fallback if advanced optics fail.
      });

    return () => {
      active = false;
    };
  }, []);

  if (!GlassComponent) {
    return <div className={`${className} glass-fallback`}>{children}</div>;
  }

  return (
    <GlassComponent
      className={className}
      style={{ background: "var(--glass-bg)", borderRadius: 999 }}
      optics={{ frost: 7, dispersion: 0.18, strength: 0.22, bend: 0.25 }}
    >
      {children}
    </GlassComponent>
  );
}
