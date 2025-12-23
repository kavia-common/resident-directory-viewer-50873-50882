//
// Theme configuration for the Resident Directory app
//

// PUBLIC_INTERFACE
export const theme = {
  name: "light",
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    success: "#06b6d4",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
    focus: "#93c5fd",
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    round: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 20px rgba(0,0,0,0.12)",
  },
  spacing: (n) => `${4 * n}px`,
};

/**
 * PUBLIC_INTERFACE
 * applyThemeToDocument
 * Applies CSS variables for the theme to the document's :root.
 */
export function applyThemeToDocument(doc = document, t = theme) {
  if (!doc || !doc.documentElement) return;
  const root = doc.documentElement;
  const set = (key, val) => root.style.setProperty(`--${key}`, val);
  // colors
  set("color-primary", t.colors.primary);
  set("color-secondary", t.colors.secondary);
  set("color-success", t.colors.success);
  set("color-error", t.colors.error);
  set("color-background", t.colors.background);
  set("color-surface", t.colors.surface);
  set("color-text", t.colors.text);
  set("color-text-muted", t.colors.textMuted);
  set("color-border", t.colors.border);
  set("color-focus", t.colors.focus);
  // radii
  set("radius-sm", t.radii.sm);
  set("radius-md", t.radii.md);
  set("radius-lg", t.radii.lg);
  set("radius-round", t.radii.round);
  // shadows
  set("shadow-sm", t.shadows.sm);
  set("shadow-md", t.shadows.md);
  set("shadow-lg", t.shadows.lg);
}
