export const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Format the date into a human-readable string
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const humanReadableDate = date.toLocaleDateString(undefined, options);

  // Return the formatted date string
  return humanReadableDate;
}