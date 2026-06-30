import { readFileSync } from "node:fs";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const booking = readFileSync(new URL("../components/booking-flow.tsx", import.meta.url), "utf8");
const bookingOverlay = readFileSync(new URL("../components/book-service-overlay.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

const checks = [
  [layout.includes("<body suppressHydrationWarning>"), "body-level hydration suppression is present"],
  [page.includes('className="copy-mobile"'), "mobile section copy is present"],
  [booking.includes("mobileDescription"), "compact device descriptions are present"],
  [bookingOverlay.includes("beginBooking(service, device)"), "image service cards start the booking flow"],
  [
    page.includes('href="https://wa.me/255744710046"') && page.includes('target="_blank"'),
    "WhatsApp opens in a new tab",
  ],
  [
    /@media \(max-width: 600px\)[\s\S]*?\.device-options\s*{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(styles),
    "mobile device choices use a two-column grid",
  ],
  [booking.includes('data-placeholder="Choose a date"'), "mobile date prompt is present"],
  [
    /@media \(max-width: 600px\)[\s\S]*?\.service-combobox-list\s*{[\s\S]*?position:\s*static/.test(styles),
    "mobile repair choices remain in document flow",
  ],
  [
    styles.includes("padding-block: clamp(56px, 5vw, 76px) clamp(64px, 6vw, 88px)"),
    "contact section uses compact vertical spacing",
  ],
];

const failed = checks.filter(([passed]) => !passed);

if (failed.length > 0) {
  for (const [, description] of failed) console.error(`FAIL: ${description}`);
  process.exit(1);
}

for (const [, description] of checks) console.log(`PASS: ${description}`);
