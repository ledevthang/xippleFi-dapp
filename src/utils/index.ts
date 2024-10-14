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

export function formatToTwoDecimals(amount: number = 0) {
  return amount.toFixed(2);
}

export async function getBalanceByToken(
  address: `0x${string}`,
  token: `0x${string}`,
) {
  const balance = await getBalance(config, {
    address,
    token,
  });
  return Number(balance.value) || 0;
}
