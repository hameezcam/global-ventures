import React from "react";
import Link from "next/link";

interface WordmarkProps {
  /** Show the descriptor line under the name (hidden below 1280px by CSS). */
  withDescriptor?: boolean;
  className?: string;
}

/** GV monogram: a fine square frame with a serif G and an italic gold V. */
export const Monogram: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" fill="none" className={className}>
    <rect x=".5" y=".5" width="39" height="39" stroke="currentColor" strokeOpacity=".55" />
    <text
      x="20"
      y="26.5"
      textAnchor="middle"
      fontFamily="var(--font-newsreader), Newsreader, Georgia, serif"
      fontSize="17"
      letterSpacing="1"
      fill="currentColor"
    >
      G
      <tspan fill="#C7AA78" fontStyle="italic">
        V
      </tspan>
    </text>
  </svg>
);

/** Primary brand lockup used in the navigation. Never truncates or shrinks below its natural size. */
export const Wordmark: React.FC<WordmarkProps> = ({ withDescriptor = true, className = "" }) => (
  <Link href="/" className={`brand ${className}`} aria-label="Global Ventures, home">
    <Monogram />
    <span className="wm">
      <b>Global Ventures</b>
      {withDescriptor && <small>Financial Advisory &amp; Transactions</small>}
    </span>
  </Link>
);

export default Wordmark;
