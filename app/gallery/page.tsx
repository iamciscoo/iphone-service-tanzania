import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown, CheckCircle, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Repair Gallery | iPhone Service TZ",
  description: "Photos and short videos from Apple and Android device repairs in Dar es Salaam.",
};

const repairPhotos = [
  ["iphone-back-glass-damaged.webp", "Cracked iPhone back glass before repair"],
  ["iphone-back-glass-parts.webp", "Damaged and replacement iPhone back glass parts"],
  ["iphone-open-repair.webp", "Open iPhone during internal repair"],
  ["iphone-frame-detail.webp", "iPhone frame detail during inspection"],
  ["iphone-damaged-pair.webp", "Two iPhones awaiting back glass repair"],
  ["iphone-display-lines.webp", "iPhone display with vertical line damage"],
  ["iphone-frame-inspection.webp", "iPhone side frame inspection"],
  ["iphone-back-glass-restored.webp", "Restored iPhone back glass"],
  ["iphone-final-display.webp", "iPhone display after final testing"],
  ["iphone-white-restored.webp", "White iPhone after repair"],
  ["iphone-camera-detail.webp", "Restored iPhone camera housing"],
  ["iphone-restored-pair.webp", "Two restored iPhones ready for collection"],
  ["iphone-gold-restored.webp", "Gold iPhone after back glass repair"],
  ["apple-watch-battery.webp", "Apple Watch battery service"], ["apple-watch-back.webp", "Apple Watch after repair"],
  ["iphone-display-test.webp", "iPhone display test"], ["iphone-back-glass.webp", "iPhone back glass replacement"],
  ["ipad-screen.webp", "iPad screen inspection"], ["ipad-repair.webp", "iPad repair result"],
  ["ipad-side.webp", "iPad frame inspection"], ["ipad-back.webp", "iPad housing condition"],
] as const;

const pristine = [
  ["pristine-iphone.webp", "Pristine smartphone after inspection"], ["pristine-ipad.webp", "Pristine tablet after inspection"],
  ["pristine-watch.webp", "Pristine smart watch after inspection"], ["pristine-foldable.webp", "Pristine foldable Android phone"],
  ["pristine-android.webp", "Pristine Android camera system"],
] as const;

const galleryImages = [...repairPhotos, ...pristine] as const;

const featuredPhotos = [
  ["iphone-back-glass-damaged.webp", "Cracked iPhone back glass before repair"],
  ["iphone-open-repair.webp", "Open iPhone during internal repair"],
  ["iphone-back-glass-parts.webp", "Damaged and replacement iPhone back glass parts"],
  ["iphone-frame-detail.webp", "iPhone frame detail during inspection"],
  ["iphone-back-glass-restored.webp", "Restored iPhone back glass"],
  ["iphone-final-display.webp", "iPhone display after final testing"],
  ["iphone-restored-pair.webp", "Two restored iPhones ready for collection"],
] as const;

const featuredNames = new Set<string>(featuredPhotos.map(([src]) => src));
const morePhotos = galleryImages.filter(([src]) => !featuredNames.has(src));

const clips = [
  ["iphone-repair-showcase.mp4", "Display repair and final test", "iphone-final-display.webp"],
  ["iphone-restoration-process.mp4", "Inside an iPhone repair", "iphone-open-repair.webp"],
  ["iphone-final-inspection.mp4", "Back glass restoration", "iphone-back-glass-restored.webp"],
  ["iphone-screen-repair.mp4", "iPhone screen repair", "iphone-display-test.webp"],
  ["camera-replacement.mp4", "Camera replacement", "iphone-back-glass.webp"],
  ["apple-watch-repair.mp4", "Apple Watch service", "apple-watch-ready.webp"],
  ["iphone-board-repair.mp4", "Board-level inspection", "ipad-repair.webp"],
  ["iphone-final-test.mp4", "Final device testing", "pristine-iphone.webp"],
  ["samsung-flip-repair.mp4", "Samsung foldable repair", "pristine-foldable.webp"],
] as const;

export default function GalleryPage() {
  return <>
    <Navigation />
    <main className="gallery-page">
      <section className="gallery-video-section gallery-video-first"><div className="section-shell"><div className="gallery-video-header"><div className="gallery-heading"><p className="eyebrow">Inside the studio</p><h1>Short clips from the bench</h1><p><PlayCircle size={22} /> Tap play for a closer look. Clips load only when requested.</p></div><Link className="button gallery-video-cta" href="/#book">Book repair <ArrowRight size={18} /></Link></div><div className="gallery-video-grid">{clips.map(([src,title,poster])=><article key={src}><video controls controlsList="nodownload noremoteplayback" playsInline preload="none" poster={`/gallery/images/${poster}`}><source src={`/gallery/videos/${src}`} type="video/mp4" /></video><h3>{title}</h3></article>)}</div></div></section>

      <section className="gallery-section section-shell"><div className="gallery-heading"><h2>From repair to ready</h2><p>A concise look at the damage, careful bench work, and finished result.</p></div><div className="gallery-featured-grid">{featuredPhotos.map(([src,alt])=><figure className="gallery-photo" key={src}><Image src={`/gallery/images/${src}`} alt={alt} fill loading="lazy" sizes="(max-width: 600px) 50vw, 24vw" /></figure>)}</div><details className="gallery-more"><summary>View {morePhotos.length} more photos <CaretDown size={17} weight="bold" /></summary><div className="gallery-more-grid">{morePhotos.map(([src,alt])=><figure className="gallery-photo" key={src}><Image src={`/gallery/images/${src}`} alt={alt} fill loading="lazy" sizes="(max-width: 600px) 50vw, 25vw" /></figure>)}</div></details></section>

      <section className="gallery-before section-shell"><div><p className="eyebrow">Before and after</p><h2>A finish you can verify</h2><p>We inspect the repair, clean the device, and test essential functions before collection.</p><span><CheckCircle weight="fill" /> Display, cameras, charging, and audio checked</span></div><div className="gallery-before-pair"><figure><Image src="/images/screen-before.webp" alt="Damaged phone screen before repair" fill sizes="45vw" /></figure><figure><Image src="/images/screen-after.webp" alt="Phone screen after repair" fill sizes="45vw" /></figure></div></section>

      <section className="gallery-cta"><div className="section-shell"><h2>Seen enough? Let’s fix yours.</h2><p>Choose your device and repair. We will confirm availability before work begins.</p><Link className="button" href="/#book">Book your repair <ArrowRight size={18} /></Link></div></section>
    </main>
    <footer className="gallery-footer"><div className="section-shell"><span>© {new Date().getFullYear()} iPhone Service TZ</span><nav><Link href="/">Home</Link><Link href="/#services">Services</Link><Link href="/gallery">Gallery</Link><Link href="/#contact">Contact</Link></nav></div></footer>
  </>;
}
