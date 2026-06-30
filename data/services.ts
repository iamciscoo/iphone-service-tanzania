export type DeviceType = "iPhone" | "iPad" | "Android" | "Other Apple";

export type RepairService = {
  slug: string;
  name: string;
  summary: string;
  devices: DeviceType[];
  signs: string[];
  checks: string[];
};

export const repairServices: RepairService[] = [
  {
    slug: "screen-repair",
    name: "Screen Repair",
    summary: "Display, touch, glass, color, and flicker issues assessed and repaired.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Cracked glass or dark spots", "Touch delays, lines, or flicker"],
    checks: ["Display and touch response", "Brightness, color, and sensor alignment"],
  },
  {
    slug: "back-glass",
    name: "Back Glass Replacement",
    summary: "A clean rear-glass replacement with careful frame and camera protection.",
    devices: ["iPhone", "Android"],
    signs: ["Cracked or lifting rear glass", "Sharp edges around the frame"],
    checks: ["Frame condition and fit", "Camera surround and wireless charging"],
  },
  {
    slug: "battery",
    name: "Battery Replacement",
    summary: "For rapid drain, unexpected shutdowns, swelling, or poor battery health.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Fast drain or random shutdowns", "Heat, swelling, or slow charging"],
    checks: ["Battery health and power draw", "Charging stability after replacement"],
  },
  {
    slug: "charging-port",
    name: "Charging Port Repair",
    summary: "Diagnosis for loose connections, slow charging, or no power input.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Cable only works at an angle", "No charge or accessory connection"],
    checks: ["Port condition and debris", "Charging current and data connection"],
  },
  {
    slug: "camera",
    name: "Camera Repair",
    summary: "Front and rear camera faults, focus problems, shaking, and lens damage.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Blurred focus or camera shake", "Black preview or damaged lens"],
    checks: ["All camera lenses and focus", "Flash, stabilization, and image quality"],
  },
  {
    slug: "face-id",
    name: "Face ID Repair",
    summary: "Careful assessment of TrueDepth, sensor, and facial recognition faults.",
    devices: ["iPhone", "iPad"],
    signs: ["Face ID is unavailable", "Recognition fails after damage"],
    checks: ["TrueDepth sensor response", "Alignment, flex cables, and software status"],
  },
  {
    slug: "speaker",
    name: "Speaker Repair",
    summary: "Restore clear call audio, media playback, and loudspeaker performance.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Low, distorted, or silent audio", "Calls are difficult to hear"],
    checks: ["Earpiece and loudspeaker output", "Grilles, connections, and audio channels"],
  },
  {
    slug: "microphone",
    name: "Microphone Repair",
    summary: "Resolve muffled calls, failed voice notes, or intermittent recording.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Muffled calls or voice notes", "Recording cuts in and out"],
    checks: ["Primary and secondary microphones", "Call, video, and voice-note recording"],
  },
  {
    slug: "water-damage",
    name: "Water Damage Repair",
    summary: "Internal inspection, corrosion treatment, recovery testing, and repair advice.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["Device stopped after liquid contact", "Fogging, heat, or unstable functions"],
    checks: ["Internal moisture and corrosion", "Power rails and recoverable functions"],
  },
  {
    slug: "housing",
    name: "Housing Replacement",
    summary: "Replace bent, dented, or heavily worn frames and outer casings.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Bent frame or deep dents", "Poor screen fit or damaged corners"],
    checks: ["Frame alignment and component fit", "Buttons, cameras, and charging position"],
  },
  {
    slug: "button",
    name: "Button Repair",
    summary: "Power, volume, mute, and home button diagnosis and repair.",
    devices: ["iPhone", "iPad", "Android"],
    signs: ["Button is stuck or unresponsive", "Intermittent volume or power control"],
    checks: ["Button travel and flex cables", "Related software and accessibility settings"],
  },
  {
    slug: "motherboard",
    name: "Motherboard Repair",
    summary: "Board-level diagnosis for complex power, signal, and component faults.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["No power after basic repairs", "Restart loops or missing functions"],
    checks: ["Board power lines and components", "Shorts, corrosion, and connection faults"],
  },
  {
    slug: "software-recovery",
    name: "Software Recovery",
    summary: "Support for update loops, disabled devices, restore errors, and system faults.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["Stuck logo or update loop", "Restore errors or disabled device"],
    checks: ["System version and storage health", "Recovery, update, and activation status"],
  },
  {
    slug: "data-transfer",
    name: "Data Transfer",
    summary: "Move photos, contacts, apps, and settings to your replacement device.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["Moving to a new device", "Data needs a safe backup or transfer"],
    checks: ["Available storage and backup status", "Photos, contacts, apps, and settings"],
  },
  {
    slug: "diagnostics",
    name: "Diagnostic Services",
    summary: "A complete device check to identify the real fault before repair begins.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["The cause is unclear", "Several functions fail together"],
    checks: ["Hardware and software health", "A clear fault report and repair options"],
  },
  {
    slug: "watch-repair",
    name: "Apple Watch Repair",
    summary: "Screen, battery, charging, and water-damage assessment for Apple Watch.",
    devices: ["Other Apple"],
    signs: ["Cracked display or weak battery", "Charging or touch problems"],
    checks: ["Display, touch, and charging", "Battery, buttons, and moisture indicators"],
  },
  {
    slug: "macbook-repair",
    name: "MacBook Repair",
    summary: "Diagnostics, power, display, keyboard, battery, and board-level support.",
    devices: ["Other Apple"],
    signs: ["No power, poor battery, or heat", "Display, keyboard, or charging faults"],
    checks: ["Battery, ports, and display output", "Keyboard, storage, and logic-board health"],
  },
  {
    slug: "device-cleaning",
    name: "Device Cleaning",
    summary: "Careful cleaning for ports, speakers, microphones, and device surfaces.",
    devices: ["iPhone", "iPad", "Android", "Other Apple"],
    signs: ["Blocked ports or quiet speakers", "Visible dust around openings"],
    checks: ["Ports, grilles, and microphone openings", "Charging and audio after cleaning"],
  },
];
