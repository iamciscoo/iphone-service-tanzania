"use client";

import type { DeviceType } from "@/data/services";
import { beginBooking } from "@/lib/booking-navigation";

type BookServiceOverlayProps = {
  label: string;
  service: string;
  device?: DeviceType;
};

export function BookServiceOverlay({ label, service, device }: BookServiceOverlayProps) {
  return (
    <button
      className="popular-book-overlay"
      type="button"
      aria-label={`Book ${label}`}
      onClick={() => beginBooking(service, device)}
    />
  );
}
