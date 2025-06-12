/**
 * Parses natural language dates into ISO strings
 * @param {string} dateString - Natural language date string
 * @returns {string} ISO date string or empty string if invalid
 */
export const parseNaturalDate = (dateString) => {
  if (!dateString) return '';
  
  // Handle common date formats
  const date = new Date(dateString);
  
  // If date is invalid, try adding time to current date
  if (isNaN(date.getTime())) {
    const withTime = new Date(`${new Date().toDateString()} ${dateString}`);
    if (!isNaN(withTime.getTime())) {
      return withTime.toISOString();
    }
    return '';
  }
  
  return date.toISOString();
};

/**
 * Formats date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (dateString) => {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
