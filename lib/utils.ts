import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianTime(date: Date | string | undefined): string {
  if (!date) return "";

  const formattedDate = new Date(date);

  return (
    convertToDateFormat(formattedDate) +
    " at " +
    formatIndianTimeOnly(formattedDate)
  );
}

export const convertToDateFormat = (date: Date | string) => {
  const formattedDate = new Date(date);
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(
    formattedDate
  );
};

export function formatIndianTimeOnly(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  return date.toLocaleString("en-IN", options).toUpperCase();
}
