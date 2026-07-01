import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/navigation";
import { GalleryVideoCarousel } from "@/components/gallery-video";

export const metadata: Metadata = {
  title: "Repair Gallery | iPhone Service TZ",
  description: "Before-and-after photos and short videos from device repairs in Dar es Salaam.",
};

const clips = [
  ["insta360-restoration-2026.mp4", "Insta360 restoration", "clip-insta360-2026.webp"],
  ["iphone-camera-backglass-2026.mp4", "Camera and back-glass repair", "clip-camera-backglass-2026.webp"],
  ["iphone-backglass-housing-2026.mp4", "Back glass and housing rebuild", "clip-backglass-housing-2026.webp"],
  ["iphone-repair-showcase.mp4", "Display repair and final test", "clip-display-final-test-2026.webp"],
  ["iphone-restoration-process.mp4", "Inside an iPhone repair", "iphone-open-repair.webp"],
  ["iphone-final-inspection.mp4", "Back glass restoration", "clip-backglass-restoration-2026.webp"],
  ["iphone-screen-repair.mp4", "iPhone screen repair", "iphone-display-test.webp"],
  ["camera-replacement.mp4", "Camera replacement", "iphone-back-glass.webp"],
  ["apple-watch-repair.mp4", "Apple Watch service", "apple-watch-ready.webp"],
  ["iphone-board-repair.mp4", "Board-level inspection", "clip-board-inspection-2026.webp"],
  ["iphone-final-test.mp4", "Final device testing", "pristine-iphone.webp"],
  ["samsung-flip-repair.mp4", "Samsung foldable repair", "pristine-foldable.webp"],
] as const;

const repairStories = [
  {
    title: "Back glass and camera surround",
    detail: "Cracked housing restored and camera area finished cleanly.",
    before: ["repair-backglass-before-2026.webp", "Purple iPhone with badly cracked back glass before repair"],
    after: ["repair-backglass-after-2026.webp", "Purple iPhone with restored back glass and camera surrounds after repair"],
  },
  {
    title: "Damaged display",
    detail: "Broken front panel replaced, aligned, and tested.",
    before: ["repair-display-before-2026.webp", "iPhone with a damaged front display before repair"],
    after: ["repair-display-after-2026.webp", "iPhone with a working replacement display after repair"],
  },
  {
    title: "Display line failure",
    detail: "Line-damaged screen replaced with a clear working display.",
    before: ["repair-lines-before-2026.webp", "iPhone display showing green line damage before repair"],
    after: ["repair-lines-after-2026.webp", "iPhone with a clear working display after repair"],
  },
  {
    title: "Cracked iPad screen",
    detail: "Shattered tablet glass restored to a clean usable finish.",
    before: ["repair-ipad-before-2026.webp", "Red iPad with a badly cracked screen before repair"],
    after: ["repair-ipad-after-2026.webp", "Red iPad with a restored screen after repair"],
  },
] as const;

const servicePosters = [
  ["service-apple-watch-2026.webp", "Apple Watch repair service poster"],
  ["service-ipad-2026.webp", "iPad screen repair service poster"],
  ["service-battery-2026.webp", "iPhone battery service poster"],
  ["service-screen-2026.webp", "iPhone screen repair service poster"],
  ["service-magic-mouse-poster-v3-2026.webp", "Apple Magic Mouse repair service poster showing a repaired mouse beside a cracked one"],
] as const;

export default function GalleryPage() {
  return <>
    <Navigation />
    <main className="gallery-page">
      <section className="gallery-video-section gallery-video-first">
        <div className="section-shell">
          <div className="gallery-video-header">
            <div className="gallery-heading">
              <p className="eyebrow">Inside the studio</p>
              <h1>Short clips from the bench</h1>
              <p><PlayCircle size={22} /> Repair footage only. Clips stay paused until you choose to play.</p>
            </div>
            <Link className="button gallery-video-cta" href="/#book">Book repair <ArrowRight size={18} /></Link>
          </div>
          <GalleryVideoCarousel clips={clips} />
        </div>
      </section>

      <section className="gallery-section section-shell" aria-labelledby="repair-results-title">
        <div className="gallery-heading">
          <p className="eyebrow">Real repair results</p>
          <h2 id="repair-results-title">From repair to ready</h2>
          <p>Matched before-and-after photos show the condition we received and the finish we returned.</p>
        </div>
        <div className="gallery-repair-story-grid">
          {repairStories.map((story) => (
            <article className="gallery-repair-story" key={story.title}>
              <div className="gallery-repair-story-images">
                <figure>
                  <Image src={`/gallery/images/${story.before[0]}`} alt={story.before[1]} fill loading="lazy" sizes="(max-width: 600px) 46vw, 24vw" />
                  <figcaption>Before</figcaption>
                </figure>
                <figure>
                  <Image src={`/gallery/images/${story.after[0]}`} alt={story.after[1]} fill loading="lazy" sizes="(max-width: 600px) 46vw, 24vw" />
                  <figcaption>After</figcaption>
                </figure>
              </div>
              <div className="gallery-repair-story-copy"><h3>{story.title}</h3><p>{story.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-poster-section">
        <div className="section-shell">
          <div className="gallery-heading"><p className="eyebrow">More we repair</p><h2>Care beyond phones</h2><p>Selected services and recent work across watches, tablets, batteries, displays, and accessories.</p></div>
          <div className="gallery-poster-rail">
            {servicePosters.map(([src, alt]) => <figure key={src}><Image src={`/gallery/posters/${src}`} alt={alt} fill loading="lazy" sizes="(max-width: 600px) 78vw, 24vw" /></figure>)}
          </div>
        </div>
      </section>

      <section className="gallery-cta"><div className="section-shell"><h2>Seen enough? Let&apos;s fix yours.</h2><p>Choose your device and repair. We will confirm availability before work begins.</p><Link className="button" href="/#book">Book your repair <ArrowRight size={18} /></Link></div></section>
    </main>
    <footer className="gallery-footer"><div className="section-shell"><span>© {new Date().getFullYear()} iPhone Service TZ</span><nav><Link href="/">Home</Link><Link href="/#services">Services</Link><Link href="/gallery">Gallery</Link><Link href="/#contact">Contact</Link></nav></div></footer>
  </>;
}
