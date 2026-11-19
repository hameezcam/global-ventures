"use client";

import React, { useEffect } from "react";
import { X, Shield } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flow?: "general" | "sell-business" | "buy-business" | "valuation" | "advisory";
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-navy-950/80 backdrop-blur-md transition-opacity"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl my-8 bg-navy-900 border border-gold-500/30 rounded-xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-navy-950">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              {title || "Confidential Advisory Consultation"}
            </span>
          </div>
          <button
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
