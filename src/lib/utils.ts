import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type TYPE_TASK_LIST } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function filterTasksByTab(
  list: TYPE_TASK_LIST[],
  activeTab: string | null,
): TYPE_TASK_LIST[] {
  if (activeTab === "active") {
    return list.filter((item) => !item.isCompleted);
  }
  if (activeTab === "completed") {
    return list.filter((item) => item.isCompleted);
  }
  return list;
}
