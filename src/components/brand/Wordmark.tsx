import React from "react";
import Link from "next/link";

/**
 * Primary brand lockup: the name in spaced display capitals over a gold
 * descriptor. Used identically in the navigation, menu and footer.
 */
export const Wordmark: React.FC<{ align?: "center" | "left"; className?: string }> = ({
  align = "center",
  className = "",
}) => (
  <Link
    href="/"
    className={`mark${align === "left" ? " left" : ""} ${className}`}
    aria-label="Global Ventures, home"
  >
    <b>GLOBAL VENTURES</b>
    <small>ADVISORY · TRANSACTIONS</small>
  </Link>
);

export default Wordmark;
