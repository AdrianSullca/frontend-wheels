export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
