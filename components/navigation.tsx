"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { LiquidGlassFrame } from "@/components/liquid-glass-frame";

const links = [
  { label: "Services", href: "#services" },
  { label: "Repairs", href: "#repairs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const centeredAnchors = new Set(["#repairs", "#testimonials", "#book"]);

function resolveHref(href: string, pathname: string) {
  return href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
}

function homeHref(pathname: string) {
  return pathname === "/" ? "#top" : "/";
}

function bookingHref(pathname: string) {
  return pathname === "/" ? "#book" : "/#book";
}

function menuLabel(open: boolean) {
  return open ? "Close menu" : "Open menu";
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? <X size={20} /> : <List size={22} />;
}

function pageAnchorFromEvent(event: MouseEvent) {
  const target = event.target;
  const shouldIgnore = [
    event.defaultPrevented,
    event.button !== 0,
    event.metaKey,
    event.ctrlKey,
    event.shiftKey,
    event.altKey,
    !(target instanceof Element),
  ].some(Boolean);

  return shouldIgnore ? null : (target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
}

function scrollToPageAnchor(href: string, behavior: ScrollBehavior = "smooth") {
  const heading = document.querySelector(href);
  const section = heading?.closest("section");
  if (!heading || !section) return false;

  const desktop = window.matchMedia("(min-width: 821px)").matches;
  const destination = desktop
    ? { element: section, block: "center" as ScrollLogicalPosition }
    : { element: heading, block: "start" as ScrollLogicalPosition };
  destination.element.scrollIntoView({ behavior, block: destination.block });
  return true;
}

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handlePageAnchor(event: MouseEvent) {
      const anchor = pageAnchorFromEvent(event);
      const href = anchor?.getAttribute("href");
      if (!href) return;

      setOpen(false);
      if (!centeredAnchors.has(href)) return;

      event.preventDefault();
      if (!scrollToPageAnchor(href)) return;
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", handlePageAnchor);
    const frame = pathname === "/" && centeredAnchors.has(window.location.hash)
      ? window.requestAnimationFrame(() => scrollToPageAnchor(window.location.hash, "auto"))
      : 0;
    return () => {
      document.removeEventListener("click", handlePageAnchor);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="nav-glass-wrap">
        <LiquidGlassFrame className="glass-nav">
          <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href={homeHref(pathname)} aria-label="iPhone Service Tanzania home">
            <span className="brand-mark" aria-hidden="true">
              <Image src="/brand-settings.webp" alt="" width={36} height={36} priority />
            </span>
            <span>
              iPhone Service <strong>TZ</strong>
            </span>
          </a>

          <div className="desktop-links">
            {links.map((link) => (
              <a key={link.href} href={resolveHref(link.href, pathname)}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="button button-small nav-cta" href={bookingHref(pathname)}>
            Book repair
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={menuLabel(open)}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
          </nav>
        </LiquidGlassFrame>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu"
        data-open={open}
        aria-hidden={!open}
      >
        {links.map((link) => (
          <a key={link.href} href={resolveHref(link.href, pathname)}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
