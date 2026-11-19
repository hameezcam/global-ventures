"use client";

import React, { useEffect, useId, useRef } from "react";
import { X, Shield } from "lucide-react";
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-navy-950/80 backdrop-blur-md transition-opacity"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div ref={panelRef} className="relative w-full max-w-3xl my-8 bg-navy-900 border border-gold-500/30 rounded-xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy-950">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-gold-400" />
            <span id={titleId} className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {title || "Confidential Advisory Consultation"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-ivory-100/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close consultation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-2 sm:p-4">
          <ConsultationForm
            initialFlow={flow}
            prefilledListingRef={prefilledListingRef}
            compact
            className="!border-0 !p-4 sm:!p-6 !bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
