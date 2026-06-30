import Image from "next/image";

const stackImages = [
  {
    className: "hero-stack-main",
    src: "/images/hero-repair-studio.webp",
    alt: "Technician repairing a smartphone at a clean professional workbench",
    label: "In the studio",
    sizes: "(max-width: 820px) 78vw, 42vw",
    priority: true,
  },
  {
    className: "hero-stack-ipad",
    src: "/images/hero-ipad-restored.webp",
    alt: "Restored tablet receiving a final screen polish",
    label: "iPad restored",
    sizes: "(max-width: 820px) 42vw, 20vw",
  },
  {
    className: "hero-stack-watch",
    src: "/images/hero-watch-restored.webp",
    alt: "Restored smart watch inspected after repair",
    label: "Watch ready",
    sizes: "(max-width: 820px) 39vw, 17vw",
  },
  {
    className: "hero-stack-phone",
    src: "/images/screen-after.webp",
    alt: "Smartphone display restored after screen repair",
    label: "Screen renewed",
    sizes: "(max-width: 820px) 35vw, 15vw",
  },
];

export function HeroImageStack() {
  return (
    <div className="hero-visual hero-load" aria-label="Recent Apple device repair work">
      {stackImages.map((image) => (
        <figure className={`hero-stack-card ${image.className}`} key={image.src}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={image.priority}
            loading={image.priority ? undefined : "eager"}
            sizes={image.sizes}
          />
          <figcaption>{image.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
