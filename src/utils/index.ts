import { config } from "@/wagmi";
import { getBalance } from "@wagmi/core";

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

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

export function formatToDecimals(amount?: number, decimas?: number) {
  if (amount) return amount.toFixed(decimas || 2);
  return "0";
}

export async function getBalanceByToken(
  address: `0x${string}`,
  token: `0x${string}`,
) {
  const balance = await getBalance(config, {
    address,
    token,
  });

  return Number(balance.formatted) || 0;
}

export function truncateCurrency(amount: number, decimal?: number) {
  if (amount > 9999990)
    return `${(amount / 1000000000).toFixed(decimal || 2)}B`;
  if (amount > 999999) return `${(amount / 1000000).toFixed(decimal || 2)}M`;
  if (amount > 9999) return `${(amount / 1000).toFixed(decimal || 2)}K`;
  return amount.toFixed(decimal || 2);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function findKey(obj: any, value: any) {
  return Object.keys(obj).find(
    (k) => obj[k].toLowerCase() === value.toLowerCase(),
  );
}
