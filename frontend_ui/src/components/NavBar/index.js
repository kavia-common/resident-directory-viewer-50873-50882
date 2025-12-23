import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Top navigation bar with title and About dialog trigger
 */
export default function NavBar({ title }) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content" role="navigation" aria-label="Top Navigation Bar">
          <div className="nav-left">
            <div className="brand" aria-label="Application Title">
              <span className="brand-icon" aria-hidden>🏢</span>
              <span className="brand-title">{title}</span>
            </div>
          </div>
          <div className="nav-right">
            <button
              className="btn icon"
              aria-label="About Resident Directory"
              title="About"
              onClick={() => setAboutOpen(true)}
            >
              ℹ️
            </button>
          </div>
        </div>
      </nav>

      {aboutOpen && (
        <div
          className="about-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-title"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="about-modal card"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <div className="about-header">
              <h2 id="about-title">About this app</h2>
              <button
                className="btn icon"
                aria-label="Close About"
                onClick={() => setAboutOpen(false)}
              >
                ✖
              </button>
            </div>
            <div className="about-body">
              <p>
                Resident Directory is a lightweight, frontend-only React
                application for browsing a list of residents, searching by
                name, and viewing resident details. It uses a local static dataset
                and a modern light theme with accessible interactions.
              </p>
            </div>
            <div className="about-footer">
              <button className="btn primary" onClick={() => setAboutOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};
