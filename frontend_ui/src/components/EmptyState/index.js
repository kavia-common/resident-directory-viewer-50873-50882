import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * EmptyState
 * Shows a friendly message when there are no results.
 */
export default function EmptyState({ title = "No residents found", description = "Try adjusting your search terms." }) {
  return (
    <div className="empty card" role="status" aria-live="polite">
      <div className="empty-graphic" aria-hidden>👀</div>
      <div className="empty-title">{title}</div>
      <div className="empty-desc">{description}</div>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
