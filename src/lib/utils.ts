import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(fullAddress: string) {
  if (fullAddress.length >= 13) {
    return (
      fullAddress.substring(0, 5) +
      "..." +
      fullAddress.substring(fullAddress.length - 5)
    );
  } else {
    return fullAddress;
  }
}
