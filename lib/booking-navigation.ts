import type { DeviceType } from "@/data/services";

export function beginBooking(service: string, device?: DeviceType) {
  window.dispatchEvent(
    new CustomEvent("repair:book", { detail: { service, device } }),
  );

  const heading = document.getElementById("book");
  const section = heading?.closest("section");
  const desktop = window.matchMedia("(min-width: 821px)").matches;

  (desktop ? section : heading)?.scrollIntoView({
    behavior: "smooth",
    block: desktop ? "center" : "start",
  });
  window.history.replaceState(null, "", "#book");
}
