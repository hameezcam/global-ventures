import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Primary brand lockup: the GV globe logo beside the name in spaced display
 * capitals over a gold descriptor. Used in the navigation, menu and footer.
 */
export const Wordmark: React.FC<{ align?: "center" | "left"; className?: string }> = ({
  align = "center",
  className = "",
}) => (
  <Link
    href="/"
    className={`mark${align === "left" ? " left" : ""} ${className}`}
    aria-label="Global Venture, home"
  >
    <Image className="logo" src="/gv-logo.png" alt="" width={200} height={176} priority />
    <span className="txt">
      <b>GLOBAL VENTURE</b>
      <small>ADVISORY · TRANSACTIONS</small>
    </span>
  </Link>
);

export default Wordmark;
