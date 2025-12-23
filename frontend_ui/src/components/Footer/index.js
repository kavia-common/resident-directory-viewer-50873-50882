import React from "react";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * Footer
 * Simple footer with small print.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="small">© {year} Resident Directory</div>
        <div className="small muted">Demo app · Frontend only</div>
      </div>
    </footer>
  );
}
