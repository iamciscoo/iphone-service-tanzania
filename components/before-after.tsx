"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowsLeftRight } from "@phosphor-icons/react";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const activePointer = useRef<number | null>(null);

  function updateFromPointer(clientX: number) {
    const bounds = comparisonRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, nextPosition)));
  }

  function startDragging(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || activePointer.current !== null) return;

    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    rangeRef.current?.focus({ preventScroll: true });
    updateFromPointer(event.clientX);
  }

  function continueDragging(event: ReactPointerEvent<HTMLDivElement>) {
    if (activePointer.current !== event.pointerId) return;
    updateFromPointer(event.clientX);
  }

  function stopDragging(event: ReactPointerEvent<HTMLDivElement>) {
    if (activePointer.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activePointer.current = null;
  }

  return (
    <div
      ref={comparisonRef}
      className="comparison"
      style={{ "--split": `${position}%` } as React.CSSProperties}
      onPointerDown={startDragging}
      onPointerMove={continueDragging}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={() => {
        activePointer.current = null;
      }}
    >
      <Image
        src="/images/screen-before.webp"
        alt="Cracked phone screen before repair"
        fill
        sizes="(max-width: 900px) 100vw, 55vw"
        className="comparison-image"
      />
      <div className="comparison-after" aria-hidden="true">
        <Image
          src="/images/screen-after.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 55vw"
          className="comparison-image"
        />
      </div>
      <span className="comparison-label label-before">Before</span>
      <span className="comparison-label label-after">After</span>
      <div className="comparison-handle" aria-hidden="true">
        <ArrowsLeftRight size={18} weight="bold" />
      </div>
      <label className="sr-only" htmlFor="repair-comparison">
        Move to compare the device before and after repair
      </label>
      <input
        suppressHydrationWarning
        ref={rangeRef}
        id="repair-comparison"
        className="comparison-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}
