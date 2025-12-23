//
// Simple formatters
//

/**
 * PUBLIC_INTERFACE
 * formatPhone
 * Formats a US phone number to (XXX) XXX-XXXX if possible.
 */
export function formatPhone(phone) {
  if (!phone) return "";
  const digits = ("" + phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

/**
 * PUBLIC_INTERFACE
 * formatEmail
 * Pass-through for now; placeholder for future rules.
 */
export function formatEmail(email) {
  return email || "";
}
