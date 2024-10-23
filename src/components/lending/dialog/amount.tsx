import Asset from "@/components/common/asset";
import { Token } from "@/types";
import { formatToDecimals } from "@/utils";
import { tokenToUsd } from "@/utils/swap";
import { useMemo } from "react";

interface AmountProps {
  label: string;
  symbol: Token;
  balance?: number;
  amount?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetMaxValue?: () => void;
  realTimePrice?: string;
}

function Amount({
  label,
  symbol,
  balance,
  amount,
  realTimePrice,
  onChange,
  onSetMaxValue,
}: AmountProps) {
  const usd = useMemo(() => {
    if (realTimePrice) return tokenToUsd(realTimePrice, amount || 0);
    return 0;
  }, [amount, realTimePrice]);

  return (
    <div className="mt-4 flex flex-col gap-2 space-x-4 rounded-md border-x p-2">
      <div className="flex items-center gap-2">
        <input
          value={amount}
          onChange={onChange}
          type="number"
          className="flex-1 border-none bg-transparent outline-none"
          placeholder="0.00"
        />
        <Asset symbol={symbol} className="!gap-2" />
      </div>
      <div className="!m-0 !mt-2 flex items-center justify-between text-xs">
        <div>${usd}</div>
        <div>
          <span>
            {label} {formatToDecimals(balance, 2)}
          </span>
          <span
            className="ml-2 cursor-pointer font-semibold hover:opacity-90"
            onClick={onSetMaxValue}
          >
            MAX
          </span>
        </div>
      </div>
    </div>
  );
}

export default Amount;
