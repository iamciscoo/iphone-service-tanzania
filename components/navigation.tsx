"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { LiquidGlassFrame } from "@/components/liquid-glass-frame";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Repairs", href: "#repairs" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handlePageAnchor(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href) return;

      setOpen(false);
      if (!["#process", "#repairs", "#book"].includes(href)) return;

      const heading = document.querySelector(href);
      const section = heading?.closest("section");
      if (!heading || !section) return;

      event.preventDefault();
      const desktop = window.matchMedia("(min-width: 821px)").matches;
      (desktop ? section : heading).scrollIntoView({
        behavior: "smooth",
        block: desktop ? "center" : "start",
      });
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", handlePageAnchor);
    return () => document.removeEventListener("click", handlePageAnchor);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-glass-wrap">
        <LiquidGlassFrame className="glass-nav">
          <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="iPhone Service Tanzania home">
            <span className="brand-mark" aria-hidden="true">
              <Image src="/brand-settings.webp" alt="" width={36} height={36} priority />
            </span>
            <span>
              iPhone Service <strong>TZ</strong>
            </span>
          </a>

          <div className="desktop-links">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <a className="button button-small nav-cta" href="#book">
            Book repair
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <List size={22} />}
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
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
