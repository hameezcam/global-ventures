import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  variant?: "navy" | "ivory";
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  variant = "navy",
}) => {
  const isNavy = variant === "navy";

  return (
    <section
      className={`relative pt-36 pb-20 overflow-hidden ${
        isNavy
          ? "bg-navy-950 text-white border-b border-white/10"
          : "bg-ivory-100 text-navy-900 border-b border-ivory-200"
      }`}
    >
      {/* Background radial highlight */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-40 ${
          isNavy
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-navy-950 to-navy-950"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-ivory-100 to-ivory-100"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs">
              <li>
                <Link
                  href="/"
                  className={isNavy ? "text-slate-400 hover:text-gold-400" : "text-slate-500 hover:text-navy-900"}
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <ChevronRight className={`w-3 h-3 ${isNavy ? "text-slate-600" : "text-slate-400"}`} />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={isNavy ? "text-slate-400 hover:text-gold-400" : "text-slate-500 hover:text-navy-900"}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isNavy ? "text-gold-400 font-medium" : "text-gold-600 font-medium"}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
            <span
              className={`text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.24em] font-semibold break-words ${
                isNavy ? "text-gold-400" : "text-slate-600"
              }`}
            >
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className={`text-2xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-4xl break-words ${
            isNavy ? "text-white" : "text-navy-900"
          }`}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`mt-4 text-base sm:text-lg max-w-2xl font-light leading-relaxed ${
              isNavy ? "text-ivory-100/75" : "text-slate-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
