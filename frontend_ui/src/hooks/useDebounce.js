import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useDebounce
 * Debounces a value by the specified delay.
 * @param {any} value - value to debounce
 * @param {number} delay - debounce delay in ms (default 200)
 * @returns {any} debounced value
 */
export function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
