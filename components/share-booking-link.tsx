"use client";

import { useState } from "react";
import { Check, LinkSimple } from "@phosphor-icons/react";

export function ShareBookingLink() {
  const [copied, setCopied] = useState(false);

  async function copyBookingLink() {
    const bookingUrl = `${window.location.origin}/#book`;

    function copyWithTemporaryInput() {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = bookingUrl;
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      const copiedSuccessfully = document.execCommand("copy");
      temporaryInput.remove();
      if (!copiedSuccessfully) throw new Error("Copy failed");
    }

    try {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(bookingUrl);
        } catch {
          copyWithTemporaryInput();
        }
      } else {
        copyWithTemporaryInput();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="booking-share-link">
      <button type="button" onClick={copyBookingLink} aria-live="polite">
        {copied ? <Check size={17} weight="bold" /> : <LinkSimple size={17} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
