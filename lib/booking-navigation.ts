import type { DeviceType } from "@/data/services";

export function beginBooking(service: string, device?: DeviceType) {
  window.dispatchEvent(
    new CustomEvent("repair:book", { detail: { service, device } }),
  );

  const section = document.getElementById("book");
  const desktop = window.matchMedia("(min-width: 821px)").matches;

  section?.scrollIntoView({
    behavior: "smooth",
    block: desktop ? "center" : "start",
  });
  window.history.replaceState(null, "", "#book");
}
