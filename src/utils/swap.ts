import { Decimal } from "decimal.js";
import { formatEther } from "viem";
import { formatToDecimals, truncateCurrency } from ".";

export function tokenToUsd(assetPrice: string, amount: string) {
  const realTimePrice: unknown = new Decimal(assetPrice).toFixed(0);
  const usd = formatEther(realTimePrice as bigint);
  const price = +amount * +usd;
  const format = truncateCurrency(+formatToDecimals(price));
  return format || 0;
}
