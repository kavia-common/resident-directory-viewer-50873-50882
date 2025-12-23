import React, { memo } from "react";
import PropTypes from "prop-types";
import { initialsFromName, colorForName } from "../../utils/avatar";
import { formatPhone } from "../../utils/formatters";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * ResidentListItem
 * Renders a single resident row in the list.
 */
function ResidentListItem({ resident, onSelect, selected }) {
  const { id, name, unit, phone, email, photo } = resident || {};
  const initials = initialsFromName(name || "");
  const bg = colorForName(name || "");

  return (
    <button
      className={`resident-item ${selected ? "selected" : ""}`}
      onClick={() => onSelect?.(resident)}
      aria-pressed={selected}
      aria-label={`View details for ${name || "resident"}`}
    >
      <div className="avatar" style={{ background: bg }}>
        {photo ? (
          <img src={photo} alt={`Avatar of ${name}`} />
        ) : (
          <span className="initials">{initials}</span>
        )}
      </div>
      <div className="meta">
        <div className="name">{name}</div>
        <div className="sub">
          <span className="badge" title="Apartment/Unit">{unit}</span>
          <span className="sep">•</span>
          <span className="muted" title="Phone">{formatPhone(phone)}</span>
        </div>
        <div className="email">{email}</div>
      </div>
    </button>
  );
}

ResidentListItem.propTypes = {
  resident: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
};

export default memo(ResidentListItem);
