"use client";

import { useMemo, useState, type FocusEvent, type KeyboardEvent } from "react";
import { CaretDown, Check, MagnifyingGlass, X } from "@phosphor-icons/react";
import type { RepairService } from "@/data/services";

type ServiceComboboxProps = {
  services: RepairService[];
  value: string;
  onChange: (slug: string) => void;
};

export function ServiceCombobox({ services, value, onChange }: ServiceComboboxProps) {
  const selected = services.find((service) => service.slug === value);
  const [query, setQuery] = useState(selected?.name ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search || selected?.name === query) return services;

    return services
      .map((service) => {
        const name = service.name.toLowerCase();
        const score = name.startsWith(search)
          ? 0
          : name.includes(search)
            ? 1
            : service.summary.toLowerCase().includes(search)
              ? 2
              : 3;
        return { service, score };
      })
      .filter((result) => result.score < 3)
      .sort((a, b) => a.score - b.score)
      .map((result) => result.service);
  }, [query, selected?.name, services]);

  function choose(service: RepairService) {
    onChange(service.slug);
    setQuery(service.name);
    setOpen(false);
  }

  function clear() {
    onChange("");
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        open ? Math.min(index + 1, Math.max(filtered.length - 1, 0)) : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && open && filtered[activeIndex]) {
      event.preventDefault();
      choose(filtered[activeIndex]);
    }

    if (event.key === "Escape") {
      setOpen(false);
      setQuery(selected?.name ?? "");
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
      if (selected) setQuery(selected.name);
    }
  }

  return (
    <div className="service-combobox" onBlur={handleBlur}>
      <div className="service-combobox-input" data-open={open}>
        <MagnifyingGlass size={19} aria-hidden="true" />
        <input
          suppressHydrationWarning
          id="repair-service"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="repair-service-options"
          aria-activedescendant={
            open && filtered[activeIndex]
              ? `repair-service-${filtered[activeIndex].slug}`
              : undefined
          }
          autoComplete="off"
          placeholder="Type or choose a repair"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
            if (event.target.value !== selected?.name) onChange("");
          }}
          onKeyDown={handleKeyDown}
        />
        {query ? (
          <button type="button" aria-label="Clear repair search" onClick={clear}>
            <X size={17} />
          </button>
        ) : (
          <button
            type="button"
            aria-label={open ? "Close repair options" : "Open repair options"}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <CaretDown size={17} data-open={open} />
          </button>
        )}
      </div>

      {open && (
        <div className="service-combobox-list" id="repair-service-options" role="listbox">
          {filtered.map((service, index) => (
            <button
              id={`repair-service-${service.slug}`}
              key={service.slug}
              type="button"
              role="option"
              aria-selected={service.slug === value}
              data-active={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(service)}
            >
              <span>
                <strong>{service.name}</strong>
                <small>{service.devices.join(" · ")}</small>
              </span>
              {service.slug === value ? <Check size={18} weight="bold" /> : null}
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="service-combobox-empty">
              <strong>No matching repair</strong>
              <span>Try “screen”, “battery”, or choose Diagnostic Services.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
