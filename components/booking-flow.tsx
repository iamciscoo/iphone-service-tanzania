"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  DeviceMobile,
  DeviceTablet,
  Laptop,
} from "@phosphor-icons/react";
import { repairServices, type DeviceType } from "@/data/services";
import { ServiceCombobox } from "@/components/service-combobox";

type BookingStatus = "idle" | "loading" | "success" | "error";

const devices: Array<{
  name: DeviceType;
  description: string;
  icon: typeof DeviceMobile;
}> = [
  { name: "iPhone", description: "All supported iPhone models", icon: DeviceMobile },
  { name: "iPad", description: "iPad, Air, mini, and Pro", icon: DeviceTablet },
  { name: "Android", description: "Samsung, Pixel, Tecno, Infinix, Xiaomi, and more", icon: DeviceMobile },
  { name: "Other Apple", description: "Apple Watch or MacBook", icon: Laptop },
];

export function BookingFlow() {
  const [stage, setStage] = useState(0);
  const [device, setDevice] = useState<DeviceType | "">("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [message, setMessage] = useState("");

  const availableServices = useMemo(
    () =>
      device
        ? repairServices.filter((item) => item.devices.includes(device))
        : repairServices,
    [device],
  );

  useEffect(() => {
    function handleBooking(event: Event) {
      const detail = (event as CustomEvent<{ service?: string; device?: DeviceType }>).detail;
      if (detail?.device) setDevice(detail.device);
      if (detail?.service) setService(detail.service);
      setStage(detail?.service ? 2 : detail?.device ? 1 : 0);
      setStatus("idle");
    }

    window.addEventListener("repair:book", handleBooking);
    return () => window.removeEventListener("repair:book", handleBooking);
  }, []);

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, device, service }),
      });

      if (!response.ok) throw new Error("Booking request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("We could not save your request. Please try again or contact us on WhatsApp.");
    }
  }

  function restart() {
    setStage(0);
    setDevice("");
    setService("");
    setStatus("idle");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div className="booking-success" role="status">
        <span className="success-icon">
          <Check size={28} weight="bold" />
        </span>
        <h3>Request received</h3>
        <p>We will confirm your repair time by phone or WhatsApp.</p>
        <button type="button" className="button button-secondary" onClick={restart}>
          Book another repair
        </button>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <div className="booking-progress" aria-label="Booking progress">
        {[
          { label: "Device", index: 0 },
          { label: "Repair", index: 1 },
          { label: "Your details", index: 2 },
        ].map((item) => (
          <span key={item.label} data-active={stage >= item.index}>
            {stage > item.index ? <CheckCircle size={16} weight="fill" /> : null}
            {item.label}
          </span>
        ))}
      </div>

      {stage === 0 && (
        <div className="booking-panel">
          <h3>Which device needs help?</h3>
          <div className="device-options">
            {devices.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.name}
                  data-active={device === item.name}
                  onClick={() => setDevice(item.name)}
                >
                  <Icon size={25} />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            className="button booking-next"
            type="button"
            disabled={!device}
            onClick={() => setStage(1)}
          >
            Choose repair <ArrowRight size={18} />
          </button>
        </div>
      )}

      {stage === 1 && (
        <div className="booking-panel">
          <button className="back-button" type="button" onClick={() => setStage(0)}>
            <ArrowLeft size={17} /> Change device
          </button>
          <h3>What should we inspect?</h3>
          <div className="field">
            <label htmlFor="repair-service">Repair service</label>
            <ServiceCombobox
              services={availableServices}
              value={service}
              onChange={setService}
            />
          </div>
          <p className="field-helper">
            Not sure? Choose Diagnostic Services and we will assess the device first.
          </p>
          <button
            className="button booking-next"
            type="button"
            disabled={!service}
            onClick={() => setStage(2)}
          >
            Add details <ArrowRight size={18} />
          </button>
        </div>
      )}

      {stage === 2 && (
        <form className="booking-panel" onSubmit={submitBooking}>
          <button className="back-button" type="button" onClick={() => setStage(1)}>
            <ArrowLeft size={17} /> Change repair
          </button>
          <h3>Tell us how to reach you</h3>
          <div className="form-grid">
            <label className="field">
              <span>Full name</span>
              <input name="name" autoComplete="name" required placeholder="Your name" />
            </label>
            <label className="field">
              <span>Phone or WhatsApp</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="07XX XXX XXX"
              />
            </label>
            <label className="field">
              <span>Preferred date</span>
              <input name="date" type="date" min={new Date().toISOString().split("T")[0]} required />
            </label>
            <label className="field">
              <span>Device model</span>
              <input name="model" required placeholder="For example, iPhone 15 Pro or Galaxy S24" />
            </label>
          </div>
          <label className="field">
            <span>What happened? (optional)</span>
            <textarea name="notes" rows={3} placeholder="Share any symptoms or damage" />
          </label>
          {status === "error" && <p className="form-error">{message}</p>}
          <button className="button booking-submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending request..." : "Request appointment"}
          </button>
          <p className="privacy-note">No payment is taken online. We confirm the service before work begins.</p>
        </form>
      )}
    </div>
  );
}
