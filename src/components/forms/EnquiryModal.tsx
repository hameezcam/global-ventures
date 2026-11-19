"use client";

import React, { useEffect, useId, useRef } from "react";
import ConsultationForm from "./ConsultationForm";
import type { FlowType } from "@/lib/enquiry/schema";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flow?: FlowType;
  prefilledListingRef?: string;
  title?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  flow = "general",
  prefilledListingRef = "",
  title,
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep keyboard focus inside the dialog.
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    // Move focus to the first form field once the dialog renders.
    const raf = requestAnimationFrame(() => {
      const firstField = panelRef.current?.querySelector<HTMLElement>("input:not([tabindex='-1']), select, textarea");
      (firstField ?? focusables()[0])?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="gv-modal">
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="panel">
        <div className="bar">
          <span id={titleId}>{title || "Confidential consultation"}</span>
          <button type="button" onClick={onClose} aria-label="Close consultation form">
            Close ✕
          </button>
        </div>
        <div className="body">
          <ConsultationForm initialFlow={flow} prefilledListingRef={prefilledListingRef} compact />
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
