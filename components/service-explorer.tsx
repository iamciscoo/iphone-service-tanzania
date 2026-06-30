"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";
import { repairServices, type DeviceType } from "@/data/services";
import { beginBooking } from "@/lib/booking-navigation";

const filters: Array<"All" | DeviceType> = ["All", "iPhone", "iPad", "Android", "Other Apple"];
const mobilePageSize = 6;

export function ServiceExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("screen-repair");
  const [activePage, setActivePage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return repairServices.filter((service) => {
      const deviceMatch = filter === "All" || service.devices.includes(filter);
      const searchMatch =
        !search ||
        service.name.toLowerCase().includes(search) ||
        service.summary.toLowerCase().includes(search);
      return deviceMatch && searchMatch;
    });
  }, [filter, query]);

  const selected =
    filtered.find((service) => service.slug === selectedSlug) ??
    filtered[0] ??
    repairServices.find((service) => service.slug === selectedSlug) ??
    repairServices[0];

  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(filtered.length / mobilePageSize) }, (_, index) =>
        filtered.slice(index * mobilePageSize, (index + 1) * mobilePageSize),
      ),
    [filtered],
  );

  function resetCarousel() {
    setActivePage(0);
    carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function showPage(index: number) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setActivePage(index);
    carousel.scrollTo({ left: carousel.clientWidth * index, behavior: "smooth" });
  }

  return (
    <div className="service-browser">
      <div className="service-controls">
        <div className="filter-tabs" aria-label="Filter repair services">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              data-active={filter === item}
              onClick={() => {
                setFilter(item);
                resetCarousel();
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="service-search">
          <span className="sr-only">Search services</span>
          <MagnifyingGlass size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetCarousel();
            }}
            placeholder="Search repairs"
          />
        </label>
      </div>

      <div className="service-layout">
        <div className="service-carousel">
          <div
            className="service-grid"
            aria-live="polite"
            ref={carouselRef}
            onScroll={(event) => {
              const carousel = event.currentTarget;
              const page = Math.round(carousel.scrollLeft / carousel.clientWidth);
              if (page !== activePage) setActivePage(page);
            }}
          >
            {pages.map((page, pageIndex) => (
              <div
                className="service-page"
                aria-label={`Repair options page ${pageIndex + 1} of ${pages.length}`}
                key={page.map((service) => service.slug).join("-")}
              >
                {page.map((service) => (
                  <button
                    className="service-option"
                    data-active={selected.slug === service.slug}
                    key={service.slug}
                    type="button"
                    onClick={() => setSelectedSlug(service.slug)}
                  >
                    <span>{service.name}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="empty-state">
                <MagnifyingGlass size={24} />
                <p>No matching repair yet. Try a broader search or contact us.</p>
              </div>
            )}
          </div>

          {pages.length > 1 && (
            <div className="service-pagination" aria-label="Repair options pages">
              {pages.map((page, index) => (
                <button
                  aria-label={`Show repair options page ${index + 1}`}
                  aria-current={activePage === index ? "page" : undefined}
                  data-active={activePage === index}
                  key={page[0]?.slug ?? index}
                  type="button"
                  onClick={() => showPage(index)}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="service-detail" aria-label={`${selected.name} details`}>
          <div className="service-detail-heading">
            <CheckCircle size={28} weight="fill" aria-hidden="true" />
            <span>Repair overview</span>
            <h3>{selected.name}</h3>
            <p>{selected.summary}</p>
          </div>
          <div className="device-list" aria-label="Supported devices">
            {selected.devices.map((device) => (
              <span key={device}>{device}</span>
            ))}
          </div>
          <div className="service-detail-groups">
            <section>
              <h4>Common signs</h4>
              <ul>
                {selected.signs.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4>What we check</h4>
              <ul>
                {selected.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className="service-detail-action">
            <p>Findings, repair options, and warranty terms are confirmed before work begins.</p>
            <button
              className="button button-dark"
              type="button"
              onClick={() => beginBooking(selected.slug, selected.devices[0])}
            >
              Book this repair
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
