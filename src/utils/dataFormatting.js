/**
 * Friendly data formatting utilities
 * Converts raw backend values to user-friendly labels
 */

/**
 * Format label with fallback to user-friendly text
 */
export const formatDataLabel = (value, defaultText = "Not reported") => {
  if (!value || value === "" || value === "null") {
    return defaultText;
  }
  return String(value);
};

/**
 * Get friendly label for different data types
 */
export const getFriendlyLabel = (value, type = "default") => {
  if (!value) {
    switch (type) {
      case "year":
        return "Not specified";
      case "column":
        return "Not available";
      case "row":
        return "Not available";
      case "section":
        return "Not categorized";
      default:
        return "Not reported";
    }
  }
  return String(value);
};

/**
 * Truncate text with ellipsis for display
 * Keeps words intact
 */
export const truncateText = (text, maxLength = 30) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength - 1)}…`;
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "—";
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;
    return date.toLocaleString();
  } catch {
    return timestamp;
  }
};

/**
 * Get value with fallback formatting
 */
export const getDisplayValue = (value, type = "default") => {
  const friendly = getFriendlyLabel(value, type);
  return truncateText(friendly, 30);
};
