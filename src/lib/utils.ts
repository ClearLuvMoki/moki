import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function compareDesc(dateLeft: string | Date, dateRight: string | Date) {
    const d1 = dayjs(dateLeft)
    const d2 = dayjs(dateRight)

    if (d1.isAfter(d2)) return -1
    if (d1.isBefore(d2)) return 1
    return 0
}

export function absoluteUrl(path: string) {
  const isDev = process.env.NODE_ENV === "development"
  return `${isDev ? "http://localhost:3000" : "https://moonquakes.online"}${path}`
}