const formatter = new Intl.DateTimeFormat('pt-BR');

export function formatDate(date) {
  return formatter.format(date);
}

export function formatTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function formatDateTime(date, middle = ", ") {
  return `${formatter.format(date)}${middle}${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}