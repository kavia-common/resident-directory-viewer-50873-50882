import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { initialsFromName, colorForName } from "../../utils/avatar";
import { formatPhone, formatEmail } from "../../utils/formatters";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * ResidentDetail
 * Shows detailed info for a selected resident.
 */
export default function ResidentDetail({ resident, onClose, isModal }) {
  const { name, unit, phone, email, photo } = resident || {};
  const initials = initialsFromName(name || "");
  const bg = colorForName(name || "");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const content = (
    <div className="detail card" role="region" aria-label="Resident details">
      <div className="detail-header">
        <div className="detail-avatar" style={{ background: bg }}>
          {photo ? (
            <img src={photo} alt={`Avatar of ${name}`} />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div>
          <div className="detail-name">{name}</div>
          <div className="detail-unit badge" title="Apartment/Unit">{unit}</div>
        </div>
        <div className="spacer" />
        <button className="btn icon" aria-label="Close details" onClick={onClose}>✖</button>
      </div>

      <div className="detail-body">
        <div className="info-row">
          <span className="info-label">Phone</span>
          <a className="info-value linkish" href={`tel:${phone}`}>{formatPhone(phone)}</a>
        </div>
        <div className="info-row">
          <span className="info-label">Email</span>
          <a className="info-value linkish" href={`mailto:${email}`}>{formatEmail(email)}</a>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="detail-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Resident details">
        <div className="detail-modal" onClick={(e) => e.stopPropagation()} role="document">
          {content}
        </div>
      </div>
    );
  }

  return <aside className="detail-panel">{content}</aside>;
}

ResidentDetail.propTypes = {
  resident: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
  }),
  onClose: PropTypes.func,
  isModal: PropTypes.bool,
};
