import React from "react";
import PropTypes from "prop-types";
import ResidentListItem from "../ResidentListItem";
import EmptyState from "../EmptyState";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * ResidentList
 * Renders the filtered list of residents.
 */
export default function ResidentList({ residents, onSelect, selectedId, totalCount }) {
  const has = (residents || []).length > 0;

  return (
    <section aria-label="Resident list" className="resident-list card">
      <div className="resident-list-header">
        <div className="title">
          Residents
          <span className="count-badge" aria-label="Filtered results count">{residents.length}</span>
        </div>
        {typeof totalCount === "number" && (
          <div className="muted small">{residents.length} of {totalCount}</div>
        )}
      </div>

      <div className="resident-list-body scroll-y">
        {!has ? (
          <EmptyState title="No residents match your search" description="Try different keywords or clear the search." />
        ) : (
          <div className="resident-list-grid" role="list">
            {residents.map((r) => (
              <div role="listitem" key={r.id}>
                <ResidentListItem
                  resident={r}
                  onSelect={onSelect}
                  selected={String(selectedId || "") === String(r.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

ResidentList.propTypes = {
  residents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  selectedId: PropTypes.string,
  totalCount: PropTypes.number,
};
