import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light"; // dark = dark navy background; light = light ivory background
  size?: "sm" | "md" | "lg";
  withSubtitle?: boolean;
  className?: string;
}

export const GVMonogram: React.FC<{
  size?: number;
  variant?: "dark" | "light";
  className?: string;
}> = ({ size = 36, variant = "dark", className = "" }) => {
  const goldColor = "#C7AA78";
  const primaryStroke = variant === "dark" ? "#FFFFFF" : "#0B1C30";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 group-hover:scale-105 shrink-0 ${className}`}
      aria-label="Global Ventures GV Monogram"
    >
      {/* Outer subtle shield / diamond geometric frame */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="2"
        stroke={goldColor}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        stroke={goldColor}
        strokeWidth="0.75"
        strokeDasharray="2 3"
        strokeOpacity="0.3"
      />

      {/* Stylized 'G' character */}
      <path
        d="M50 24C35.6 24 24 35.6 24 50C24 64.4 35.6 76 50 76C61.8 76 71.8 68.2 74.8 57.5H48V48.5H82C82.3 50.1 82.5 51.7 82.5 53.4C82.5 70.3 67.8 84 50 84C31.2 84 16 68.8 16 50C16 31.2 31.2 16 50 16C61.4 16 71.5 21.6 77.8 30.2L70.5 35.6C65.8 28.6 58.4 24 50 24Z"
        fill={primaryStroke}
        fillOpacity={variant === "dark" ? 0.95 : 0.9}
      />

      {/* Intersecting Architectural Chevron / 'V' character in Champagne Gold */}
      <path
        d="M34 32L50 68L66 32H73L52.5 78H47.5L27 32H34Z"
        fill={goldColor}
      />

      {/* Center Pinnacle Diamond */}
      <polygon
        points="50,42 54,48 50,54 46,48"
        fill={goldColor}
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  size = "md",
  withSubtitle = true,
  className = "",
}) => {
  const iconSize = size === "sm" ? 28 : size === "lg" ? 48 : 34;
  const titleClass =
    size === "sm"
      ? "text-xs sm:text-sm tracking-[0.14em]"
      : size === "lg"
        ? "text-xl sm:text-2xl tracking-[0.18em]"
        : "text-sm sm:text-lg tracking-[0.14em] sm:tracking-[0.18em]";

  const textColor = variant === "dark" ? "text-white" : "text-navy-900";
  const subColor = variant === "dark" ? "text-gold-400" : "text-slate-600";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 sm:gap-3.5 focus:outline-none min-w-0 shrink ${className}`}
      aria-label="Global Ventures Homepage"
    >
      <GVMonogram size={iconSize} variant={variant} />
      <div className="flex flex-col min-w-0">
        <span
          className={`font-serif font-bold uppercase truncate ${textColor} ${titleClass} transition-colors group-hover:text-gold-400`}
        >
          GLOBAL VENTURES
        </span>
        {withSubtitle && (
          <span
            className={`hidden sm:block text-[9px] uppercase tracking-[0.24em] font-sans font-medium whitespace-nowrap ${subColor}`}
          >
            Advisory &bull; Transactions &bull; Capital
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
