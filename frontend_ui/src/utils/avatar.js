const COLORS = [
  "#3b82f6", // primary
  "#06b6d4", // success
  "#64748b", // secondary
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
];

/**
 * PUBLIC_INTERFACE
 * initialsFromName
 * Returns initials from a full name.
 */
export function initialsFromName(name = "") {
  const parts = String(name).trim().split(/\s+/);
  if (!parts.length) return "";
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * PUBLIC_INTERFACE
 * colorForName
 * Deterministic color selection for a given name.
 */
export function colorForName(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const idx = Math.abs(hash) % COLORS.length;
  return COLORS[idx];
}
