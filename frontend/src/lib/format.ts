export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }

  return "Something went wrong. Please try again.";
}
