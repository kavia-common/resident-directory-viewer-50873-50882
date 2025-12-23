import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDebounce } from "../../hooks/useDebounce";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * Controlled input with debounce; emits onSearch(debouncedValue)
 */
export default function SearchBar({ defaultValue, onSearch, placeholder = "Search by name..." }) {
  const [value, setValue] = useState(defaultValue || "");
  const debounced = useDebounce(value, 200);

  useEffect(() => {
    if (typeof onSearch === "function") {
      onSearch(debounced);
    }
  }, [debounced, onSearch]);

  const clearable = useMemo(() => value.trim().length > 0, [value]);

  return (
    <div className="searchbar card" role="search">
      <label htmlFor="resident-search" className="visually-hidden">
        Search residents by name
      </label>
      <div className="search-input-wrap">
        <span className="search-icon" aria-hidden={true}>🔎</span>
        <input
          id="resident-search"
          className="input search-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          aria-label="Search residents by name"
        />
        {clearable && (
          <button
            type="button"
            className="btn icon"
            aria-label="Clear search"
            onClick={() => setValue("")}
            title="Clear"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  defaultValue: PropTypes.string,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};
