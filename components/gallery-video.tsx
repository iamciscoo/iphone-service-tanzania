"use client";

import { useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type GalleryClip = readonly [src: string, title: string, poster: string];

type GalleryVideoProps = {
  poster: string;
  src: string;
  title: string;
};

function GalleryVideo({ poster, src, title }: GalleryVideoProps) {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <article>
      <div className="gallery-video-frame">
        <video
          aria-label={title}
          controls
          controlsList="nodownload noremoteplayback"
          playsInline
          preload="none"
          poster={poster}
          onPlay={(event) => {
            setFailed(false);
            setLoading(true);
            document.querySelectorAll<HTMLVideoElement>(".gallery-video-grid video").forEach((video) => {
              if (video !== event.currentTarget && !video.paused) video.pause();
            });
          }}
          onPlaying={() => setLoading(false)}
          onLoadedData={() => setLoading(false)}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setFailed(true);
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {(loading || failed) && (
          <div
            className="gallery-video-status"
            data-error={failed || undefined}
            style={{ backgroundImage: `linear-gradient(rgba(231, 241, 255, .9), rgba(247, 249, 252, .96)), url(${poster})` }}
            role="status"
          >
            {failed ? (
              <span>Clip unavailable</span>
            ) : (
              <>
                <i aria-hidden="true" />
                <span>Loading clip</span>
              </>
            )}
          </div>
        )}
      </div>
      <h3>{title}</h3>
    </article>
  );
}

export function GalleryVideoCarousel({ clips }: { clips: readonly GalleryClip[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canMovePrevious, setCanMovePrevious] = useState(false);
  const [canMoveNext, setCanMoveNext] = useState(clips.length > 1);

  const updateControls = () => {
    const rail = railRef.current;
    if (!rail) return;

    setCanMovePrevious(rail.scrollLeft > 2);
    setCanMoveNext(rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2);
  };

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    const firstCard = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    rail.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior });
  };

  return (
    <>
      <div className="gallery-video-grid" ref={railRef} onScroll={updateControls}>
        {clips.map(([src, title, poster]) => (
          <GalleryVideo
            key={src}
            src={`/gallery/videos/${src}`}
            title={title}
            poster={`/gallery/posters/${poster}`}
          />
        ))}
      </div>
      <div className="gallery-video-controls" aria-label="Video slider controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous video" disabled={!canMovePrevious}>
          <CaretLeft aria-hidden="true" weight="bold" />
        </button>
        <span>Swipe or use the arrows</span>
        <button type="button" onClick={() => move(1)} aria-label="Next video" disabled={!canMoveNext}>
          <CaretRight aria-hidden="true" weight="bold" />
        </button>
      </div>
    </>
  );
}
